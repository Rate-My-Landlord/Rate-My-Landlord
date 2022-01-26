from .. import db
from ..models import Review, Landlord
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_reviews(*_):
    try:
        reviews = [review.to_json() for review in Review.query.all()]
        payload = {
            'success': True,
            'reviews': reviews
        }        
    except Exception as e:
        payload = {
            'success': True,
            'errors': [str(e)]
        }
    return payload  

@convert_kwargs_to_snake_case
def resolve_review_by_id(obj, info, review_id):
    try:
        review = Review.query.get(review_id)
        payload = {
            'success': True,
            'review': review.to_json()
        }        
    except Exception as e:
        payload = {
            'success': True,
            'errors': [str(e)]
        }
    return payload 

@convert_kwargs_to_snake_case
def resolve_update_review(obj, info, review_id, new_overall_star_rating):
    try:
        review = Review.query.get(review_id)
        if review:
            review.overall_star_rating = new_overall_star_rating
        db.session.commit()
        payload = {
            'success': True,
            'review': review.to_json()
        }
    except AttributeError:
        payload = {
            'success': False,
            'errors': ['Review with id of {} not found'.format(review_id)]
        }
    return payload

@convert_kwargs_to_snake_case
def resolve_new_review(obj, info, landlord_id, overall_star_rating,
                        author_id=None, property_id=None,
                        communication_star_rating=None, maintenance_star_rating=None,
                        text=None):
    print(landlord_id, overall_star_rating, author_id, property_id, communication_star_rating, maintenance_star_rating, text)
    return {
            'success': False,
            'errors': ['Blah']
        }


@convert_kwargs_to_snake_case
def resolve_landlords(*_):
    return [landlord.to_json() for landlord in Landlord.query.all()]