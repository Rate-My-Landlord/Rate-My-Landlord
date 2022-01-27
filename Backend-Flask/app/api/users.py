# from flask import jsonify, request, g, url_for
# from .. import db
# from ..models import User, Permission
# from . import api
# from .decorators import permission_required
# from .errors import bad_request, forbidden
# from flask_jwt_extended import create_access_token
# import datetime

# @api.route('/auth/register', methods=['POST'])
# def register():
#     new_user = User.from_json(request.json)
    
#     db.session.add(new_user)
#     db.session.commit()
    
#     return {'stauts': 'success'}
