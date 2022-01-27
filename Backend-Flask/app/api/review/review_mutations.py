from ... import db
from ...models import Landlord, Review
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def resolve_new_review(obj, info, landlord_id, overall_star_rating,
                        author_id=None, property_id=None,
                        communication_star_rating=None, maintenance_star_rating=None,
                        text=None):
    """Write a new review"""
    try:
        if not Landlord.landlord_exists(landlord_id):
            raise AttributeError('No landlord found with id of {}'.format(landlord_id))
        new_review = Review(landlord_id=landlord_id, 
                            author_id=author_id,
                            property_id=property_id,
                            overall_star_rating=overall_star_rating,
                            communication_star_rating=communication_star_rating,
                            maintenance_star_rating=maintenance_star_rating,
                            text=text)
        db.session.add(new_review)
        db.session.commit()
        payload = {
            'success': True,
            'review': new_review.to_json()
        }
    except AttributeError as a:
        payload = {
            'success': False,
            'errors': [str(a)]
        }
    except Exception as e:
        payload = {
            'success': False,
            'errors': [str(e)]
        }
    return payload

@convert_kwargs_to_snake_case
def resolve_update_review(obj, info, review_id, new_overall_star_rating):
    # TODO: Need to update this resolver with all editable fields
    """Update a review"""
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