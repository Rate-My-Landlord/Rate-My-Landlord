from flask import g, jsonify, request
from . import api
from ..models import User
from flask_httpauth import HTTPBasicAuth
from .errors import unauthorized, bad_request
import datetime
from flask_jwt_extended import create_access_token

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(phone_or_token, password):
    if phone_or_token == '':
        return False
    if password == '':
        g.current_user = User.verify_auth_token(phone_or_token)
        g.token_used = True
        return g.current_user is not None
    user = User.query.filter_by(phone=phone_or_token).first()
    if not user:
        return False
    g.current_user = user
    g.token_used = False
    return user.verify_password(password)

@auth.error_handler
def auth_error():
    return unauthorized('Invalid credentials')

# @api.before_request
# @auth.login_required
# def before_request():
#     if not g.current_user.is_anonymous and \
#             not g.current_user.confirmed:
#         return forbidden('Unconfirmed account')
    
@api.route('/tokens/', methods=['POST'])
def get_token():
    if g.current_user.is_anonymous or g.token_used:
        return unauthorized('Invalid credentials')
    return jsonify({'token': g.current_user.generate_auth_token(
        expiration=3600), 'expiration': 3600})
    
    

@api.route('/auth/login', methods=['POST'])
def login():
    body = request.json
    if not body:
        return bad_request('Request has no body')
    
    user = User.query.get(phone=body.get('phone'))
    if not user.check_password(body.get('password')):
        return bad_request('Phone number or password is invalid')
    
    expire_date = datetime.timedelta(days=7)
    access_token = create_access_token(identity=str(user.id), expires_delta=expire_date)
    
    return jsonify({'token': access_token}), 200