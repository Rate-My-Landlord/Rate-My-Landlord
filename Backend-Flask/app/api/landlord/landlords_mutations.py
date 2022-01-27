from distutils.log import error
from ... import db
from ...models import Landlord
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_new_landlord(obj, info, first_name, last_name, zip_code, user_id=None):
    try:
        new_landlord = Landlord(user_id=user_id,
                                first_name=first_name,
                                last_name=last_name,
                                zipcode=zip_code)
        db.session.add(new_landlord)
        db.session.commit()
        payload = {
            'success': True,
            'landlord': new_landlord.to_json()
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    
    return payload