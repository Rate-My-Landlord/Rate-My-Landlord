from ... import db
from ...models import User
from ariadne import convert_kwargs_to_snake_case
import re, datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

def generate_token(id):
    """Helper function for generating a JWT for a user"""
    expire_date = datetime.timedelta(days=7)
    # Creating a JWT using the users id and the JWT_SECRET that is valid for 7 days
    return create_access_token(identity=str(id), expires_delta=expire_date)

@convert_kwargs_to_snake_case
def resolve_login_user(info, obj, phone, password):
    """Log in a user"""
    try:
        phone = User.format_phone(phone)
        user = User.query.filter(User.phone==phone).first()
        if not user or not user.check_password(password):
            raise Exception('Phone number or password not valid')
        
        # Creating a JWT that is valid for 7 days
        access_token = generate_token(user.id)
        
        payload = {
            'success': True,
            'token': access_token,
            'user': user.to_json()
        }
        
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def resolve_new_user(info, obj, phone, first_name, last_name, email, password):
    """Create a new user"""
    try:
        phone = User.format_phone(phone)
        if phone is None or password is None:
            raise Exception('Phone or password not provided')
        new_user = User(phone=phone,
                        first_name=first_name,
                        last_name=last_name,
                        email=email)
        new_user.set_password(password)
        
        db.session.add(new_user)
        db.session.commit()
        
        # Creating a JWT that is valid for 7 days
        access_token = generate_token(new_user.id)
        payload = {
            'success': True,
            'token': access_token,
            'user': new_user.to_json()
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

@convert_kwargs_to_snake_case
@jwt_required()
def resolve_update_user(info, obj, first_name=None, last_name=None, email=None):
    """Update user info"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        
        db.session.commit()
        
        payload = {
            'success': True,
            'user': user.to_json()
        }        
        
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload