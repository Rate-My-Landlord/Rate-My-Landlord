from ...models import Landlord, Property
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
def resolve_landlord_by_id(obj, info, landlord_id):
    """Get a landlord by landlord_id"""
    try:
        landlord = Landlord.query.get(landlord_id)
        payload = {
            'success': True,
            'landlord': landlord.to_json()
        }
    except AttributeError:
        payload = {
            'success': False,
            'errors': ['No landlord with id of {}.'.format(landlord_id)]
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

@convert_kwargs_to_snake_case
def resolve_landlord_by_property_id(obj, info, property_id):
    """Gets the landlord of a property based on property_id"""
    try:
        property = Property.query.get(property_id)
        landlord = Landlord.query.get(property.landlord_id)
        payload = {
            'success': True,
            'landlord': landlord.to_json() 
        }
    except AttributeError:
        payload = {
            'success': False,
            'errors': ['No property with id of {}.'.format(property_id)]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload