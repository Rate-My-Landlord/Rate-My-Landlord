from flask import json, jsonify, request, g, url_for
from .. import db
from ..models import Review, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden

@api.route('/test/')
def test():
    return jsonify({ 'hello': 'world'})

@api.route('/reviews/')
def get_reviews():
    reviews = Review.query.all()
    return jsonify({ 'reviews': [review.to_json() for review in reviews] })

@api.route('/reviews/<int:id>')
def get_review(id):
    review = Review.query.get_or_404(id)
    return jsonify(review.to_json())

@api.route('/reviews', methods=['POST'])
# @permission_required(Permission.WRITE)
def new_review():
    review = Review.from_json(request.json)
    
    # review.author_id = g.current_user
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_json()), 201, \
        {'Location': url_for('api.get_reviews', id=review.id)}

# editing review
@api.route('/reviews/<int:id>', methods=['PUT'])
# @permission_required(Permission.WRITE)
def edit_review(id):
    review = Review.query.get_or_404(id)
    # if g.current_user != review.author_id and \
    #         not g.current_user.can(Permission.ADMIN):
    #     return forbidden('Insufficient permissions')
    review.text = request.json.get('text', review.text)
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_json())