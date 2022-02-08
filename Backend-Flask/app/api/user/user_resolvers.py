from ... import db
from ...models import User
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_user_by_id(info, obj, user_id):
    """Get a user by id"""
    try:
        user = User.query.get(user_id)
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