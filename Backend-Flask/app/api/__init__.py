from flask import Blueprint, request, jsonify
from ariadne.constants import PLAYGROUND_HTML
from ariadne import MutationType, graphql_sync, make_executable_schema, load_schema_from_path, ObjectType, QueryType, gql, snake_case_fallback_resolvers
from .resolvers import resolve_reviews, resolve_review_by_id, resolve_update_review, resolve_new_review, resolve_landlords

api = Blueprint('api', __name__)

type_defs = load_schema_from_path('schema.graphql')
type_defs = gql(type_defs)

query = QueryType()

query.set_field('allReviews', resolve_reviews)
query.set_field('reviewById', resolve_review_by_id)
query.set_field('landlords', resolve_landlords)

mutation = MutationType()

mutation.set_field('updateReview', resolve_update_review)
mutation.set_field('newReview', resolve_new_review)


schema = make_executable_schema(type_defs, query, mutation, snake_case_fallback_resolvers)

@api.route('/graphql', methods=['GET'])
def playground():
    return PLAYGROUND_HTML, 200

@api.route('/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    success, result  = graphql_sync(
        schema, data, context_value=request)
    status_code = 200 if success else 400
    return jsonify(result), status_code

from . import authentication, errors, reviews, users, landlord, property