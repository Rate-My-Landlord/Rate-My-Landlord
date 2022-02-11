from ...models import Landlord, Review
from ariadne import convert_kwargs_to_snake_case
from ..decorators import test_decorator

@test_decorator
@convert_kwargs_to_snake_case
def resolve_reviews(*_):
    """Get all reviews"""
    try:
        reviews = [review.to_json() for review in Review.query.all()]
        payload = {
            'success': True,
            'reviews': reviews
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload  

@convert_kwargs_to_snake_case
def resolve_review_by_id(obj, info, review_id):
    """Get a review by review_id"""
    try:
        review = Review.query.get(review_id)
        payload = {
            'success': True,
            'review': review.to_json()
        }
    except AttributeError:
        payload = {
            'success': False,
            'errors': ['No review with id of {}.'.format(review_id)]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

@convert_kwargs_to_snake_case
def resolve_reviews_by_property_id(obj, info, property_id):
    """Get a review by review_id"""
    try:
        reviews = Review.query.filter(Review.property_id==property_id)
        payload = {
            'success': True,
            'review': [review.to_json() for review in reviews]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

 
@convert_kwargs_to_snake_case
def resolver_reviews_by_landlord_id(obj, info, landlord_id):
    """Get all reviews with landlord_id"""
    try:
        reviews = Review.query.filter(Review.landlord_id==landlord_id).all()
        payload = {
            'success': True,
            'reviews': [review.to_json() for review in reviews]
        }
    except AttributeError:
        payload = {
            'success': False,
            'errors': ['No reviews with landlord_id of {}.'.format(landlord_id)]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
        
    return payload

@convert_kwargs_to_snake_case
def resolver_reviews_by_zip_code(obj, info, zip_code):
    """Get all reviews by landlord zipcode"""
    try:
        landlords = Landlord.query.filter(Landlord.zipcode==zip_code).all()
        reviews = []
        for landlord in landlords:
            for review in landlord.reviews:
                reviews.append(review.to_json())
        payload = {
            'success': True,
            'reviews': reviews
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload