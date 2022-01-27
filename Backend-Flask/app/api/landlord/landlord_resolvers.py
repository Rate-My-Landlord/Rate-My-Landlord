from ...models import Landlord
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_landlords(*_):
    """Get all landlords"""
    try:
        landlords = [landlord.to_json() for landlord in Landlord.query.all()]
        payload = {
            'success': True,
            'landlords': landlords
        }        
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

@convert_kwargs_to_snake_case
def resolve_landlords_by_zip(obj, info, zip_code):
    """
        Get all landlords by zip code.
        Eventually we should update this so it is proximity based
    """
    try:
        landlords = Landlord.query.filter(Landlord.zipcode==zip_code)
        payload = {
            'success': True,
            'landlords': [landlord.to_json() for landlord in landlords]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload