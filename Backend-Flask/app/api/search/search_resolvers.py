from ...models import Landlord, Review, Property
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_search(obj, info, zip_code, search_term):
    try:
        landlords, landlords_count = Landlord.search(expression=search_term, zip_code=zip_code)
        properties, properties_count = Property.search(expression=search_term, zip_code=zip_code)
        payload = {
            'success': True,
            'landlords': [landlord.to_json() for landlord in landlords],
            'properties': [property.to_json() for property in properties]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload
