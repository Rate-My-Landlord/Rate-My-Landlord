from ...models import Review
from ariadne import convert_kwargs_to_snake_case

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
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

 
@convert_kwargs_to_snake_case
def resolver_review_by_landlord_id(obl, info, landlord_id):
    """Get all reviews with landlord_id"""
    try:
        reviews = Review.query.filter(Review.landlord_id==landlord_id).all()
        payload = {
            'success': True,
            'reviews': [review.to_json() for review in reviews]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
        
    return payload