from ...models import Landlord, Review, Property
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_search(obj, info, zip_code, search_term):
    try:
        res = Landlord.search(search_term)
        print(res)
        payload = {
            'success': True,
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload