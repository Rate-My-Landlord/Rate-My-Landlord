from flask import json, jsonify, request, g, url_for
from .. import db
from ..models import Landlord, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden


@api.route('/landlords/')
def get_landlords():
    landlords = Landlord.query.all()
    return jsonify({'landlords': [landlord.to_json(brief=True) for landlord in landlords]})

@api.route('/landlords/z/<int:zip>')
def get_landlords_by_zip(zip):
    landlords = Landlord.query.filter_by(zipcode=zip)
    return jsonify({'zipcode': zip, 'landlords': [landlord.to_json(brief=True) for landlord in landlords]})

@api.route('/landlords/<int:id>')
def get_landlord(id):
    landlord = Landlord.query.get_or_404(id)
    return jsonify(landlord.to_json())

@api.route('/landlords', methods=['POST'])
def new_landlord():
    landlord = Landlord.from_json(request.json)
    
    db.session.add(landlord)
    db.session.commit()
    
    return jsonify(landlord.to_json()), 201, \
        {'Location': url_for('api.get_landlord', id=landlord.id)}