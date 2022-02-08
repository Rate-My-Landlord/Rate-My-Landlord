from ... import db
from ...models import Landlord, Property
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_new_property(obj, info, landlord_id, address_1, city, zip_code, state, country, address_2=None):
    """Add a new property"""
    try:
        if not Landlord.landlord_exists(landlord_id):
            raise Exception('Landlord does not exist')
        if Property.property_exists(address_1=address_1, 
                                    city=city, 
                                    zip_code=zip_code, 
                                    state=state, 
                                    country=country):
            raise Exception('Property already exists')
        new_property = Property(landlord_id=landlord_id,
                                address_1=address_1,
                                address_2=address_2,
                                city=city,
                                zipcode=zip_code,
                                state=state,
                                country=country)
        db.session.add(new_property)
        db.session.commit()
        payload = {
            'success': True,
            'property': new_property.to_json()
        }

    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
        
    return payload