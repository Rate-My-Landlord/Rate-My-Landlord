from flask import Blueprint, request, jsonify
from ariadne.constants import PLAYGROUND_HTML
from ariadne import MutationType, graphql_sync, make_executable_schema, load_schema_from_path, ObjectType, QueryType, gql, snake_case_fallback_resolvers
# Importing our resolvers
# Review
from .review.review_resolvers import *
from .review.review_mutations import *
# Landlord
from .landlord.landlord_resolvers import *
from .landlord.landlords_mutations import *

api = Blueprint('api', __name__)

# Path to schema (from root directory)
schema_path = 'schema.graphql'

# Loading Schema
type_defs = gql(load_schema_from_path(schema_path))

# Creating QueryType object
query = QueryType()
# Creating MutationType object
mutation = MutationType()

# Adding resolvers to QueryType and MutationType object
# Reviews
query.set_field('AllReviews', resolve_reviews)
query.set_field('ReviewById', resolve_review_by_id)
query.set_field('ReviewsByLandlordId', resolver_review_by_landlord_id)
mutation.set_field('UpdateReview', resolve_update_review)
mutation.set_field('NewReview', resolve_new_review)
# Landlords
query.set_field('AllLandlords', resolve_landlords)
query.set_field('LandlordsByZipCode', resolve_landlords_by_zip)
mutation.set_field('NewLandlord', resolve_new_landlord)


# Creating schema
schema = make_executable_schema(type_defs, query, mutation, snake_case_fallback_resolvers)

@api.route('/graphql', methods=['GET'])
def playground():
    return PLAYGROUND_HTML, 200

@api.route('/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    success, result  = graphql_sync(
        schema=schema, 
        data=data, 
        context_value=request)
    
    status_code = 200 if success else 400
    return jsonify(result), status_code