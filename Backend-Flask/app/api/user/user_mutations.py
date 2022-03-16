from ... import db
from ...models import User, ExternalAuth
from ariadne import convert_kwargs_to_snake_case
import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_IDS = [
    # ExpoGo (development)
    '949113263939-kpkujab0kitl565jp91b57u1mojrb0tk.apps.googleusercontent.com',
    '949113263939-pftg976fc203njlr7rbevfdhn9b3ka6u.apps.googleusercontent.com',  # iOS
    '949113263939-nnaor8s90ktpbd4g90ck1slsh5e87h4c.apps.googleusercontent.com',  # Android
    '949113263939-317nn9jfs9p4p9uhh04pbm5o2ru2s4ur.apps.googleusercontent.com',  # Web
]
VALID_PROVIDERS = ['google']


def generate_token(id):
    """Helper function for generating a JWT for a user"""
    expire_date = datetime.timedelta(days=7)
    # Creating a JWT using the users id and the JWT_SECRET that is valid for 7 days
    return create_access_token(identity=str(id), expires_delta=expire_date)


def validate_google_token(token):
    idinfo = id_token.verify_oauth2_token(
        token, requests.Request())
    if idinfo['aud'] not in GOOGLE_CLIENT_IDS:
        raise Exception('Could not verify platform')
    return idinfo


@convert_kwargs_to_snake_case
def resolve_login_user(info, obj, phone, password):
    """Log in a user"""
    try:
        phone = User.format_phone(phone)
        user = User.query.filter(User.phone == phone).first()
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
def resolve_external_login(info, obj, external_token, provider):
    """Handle an external log in request"""
    try:
        if provider not in VALID_PROVIDERS:
            raise Exception('Invalid provider')

        # Validating Google ID Token
        idinfo = validate_google_token(external_token)

        external_auth_user = ExternalAuth.query.filter(
            ExternalAuth.external_id == idinfo['sub'], ExternalAuth.provider == provider).first()
        if external_auth_user:
            payload = {
                'success': True,
                'token': generate_token(external_auth_user.user.id),
                'user': external_auth_user.user.to_json()
            }
        else:
            payload = {
                'success': True,
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
        if phone is None or password is None:
            raise Exception('Phone or password not provided')
        new_user = User.onboard_user(
            phone=phone, email=email, first_name=first_name, last_name=last_name)
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
def resolve_new_user_external(info, obj, external_token, provider, phone):
    """Create a new account with external auth"""
    try:
        # Validating Google ID Token
        idinfo = validate_google_token(external_token)

        external_auth_user = ExternalAuth.query.filter(
            ExternalAuth.external_id == idinfo['sub'], ExternalAuth.provider == provider).first()
        if external_auth_user:
            raise Exception('Account already exists')

        new_user = User.onboard_user(
            phone=phone, email=idinfo['email'], first_name=idinfo['given_name'], last_name=idinfo['family_name'])

        db.session.add(new_user)
        db.session.flush()
        new_auth = ExternalAuth(user_id=new_user.id,
                                provider=provider,
                                external_id=idinfo['sub'])
        db.session.add(new_auth)
        db.session.commit()
        payload = {
            'success': True,
            'token': generate_token(new_user.id),
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