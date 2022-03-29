from flask import Blueprint, request, jsonify
from ..models import Landlord, Property
from ariadne.constants import PLAYGROUND_HTML
from ariadne import MutationType, graphql_sync, make_executable_schema, load_schema_from_path, QueryType, gql, snake_case_fallback_resolvers
# Importing our resolvers
# Review
from .review.review_resolvers import *
from .review.review_mutations import *
# Landlord
from .landlord.landlord_resolvers import *
from .landlord.landlords_mutations import *
# Property
from .property.property_mutations import *
# User
from .user.user_mutations import *
from .user.user_resolvers import *
# Search
from .search.search_resolvers import *

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
query.set_field('ReviewsByPropertyId', resolve_reviews_by_property_id)
query.set_field('ReviewsByLandlordId', resolver_reviews_by_landlord_id)
query.set_field('ReviewsByZipCode', resolver_reviews_by_zip_code)
# mutation.set_field('UpdateReview', resolve_update_review)
mutation.set_field('NewReview', resolve_new_review)
# Landlords
query.set_field('AllLandlords', resolve_landlords)
query.set_field('LandlordById', resolve_landlord_by_id)
query.set_field('LandlordsByZipCode', resolve_landlords_by_zip)
query.set_field('LandlordByPropertyId', resolve_landlord_by_property_id)
mutation.set_field('NewLandlord', resolve_new_landlord)
# Properties
mutation.set_field('NewProperty', resolve_new_property)
# User
query.set_field('UserByUserId', resolve_user_by_id)
query.set_field('RefreshToken', resolve_refresh_token)
mutation.set_field('NewUser', resolve_new_user)
mutation.set_field('NewUserExternal', resolve_new_user_external)
mutation.set_field('Login', resolve_login_user)
mutation.set_field('ExternalLogin', resolve_external_login)
mutation.set_field('UpdateUser', resolve_update_user)
# Search
query.set_field('Search', resolve_search)


# Custom error handling
def my_format_error(error, debug=False):
    formatted = error.formatted
    # if debug:
    if formatted['message'] == 'Not enough segments':
        return 'Invalid JWT format'

    return formatted['message']
    
    # formatted['message'] = 'INTERNAL SERVER ERROR'
    # return formatted


# Creating schema
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers)


@api.route('/graphql', methods=['GET'])
def playground():
    return PLAYGROUND_HTML, 200


@api.route('/graphql', methods=['POST'])
def graphql_server():
    # Janky way of indexinf the db on startup
    indexed = False
    if not indexed:
        indexed = True
        Landlord.reindex()
        Property.reindex()
    
    data = request.get_json()
    success, result = graphql_sync(
        schema=schema,
        data=data,
        context_value=request,
        error_formatter=my_format_error)

    status_code = 200 if success else 400
    return jsonify(result), status_code
