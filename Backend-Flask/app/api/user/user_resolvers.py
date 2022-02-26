from ... import db
from ...models import User
from ariadne import convert_kwargs_to_snake_case
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


@convert_kwargs_to_snake_case
@jwt_required(optional=True)
def resolve_user_by_id(info, obj, user_id):
    """Get a user by id"""
    try:
        user = User.query.get(user_id)
        secure_request = get_jwt_identity()
        if (secure_request):
            payload ={
                'success': True,
                'user': user.to_json()
            }
        else:
            payload = {
                'success': True,
                'user': user.to_json(brief=True)
            }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload