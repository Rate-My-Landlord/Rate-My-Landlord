from flask import json
from flask.globals import request
from flask.helpers import url_for
from flask.json import jsonify
from .. import db
from ..models import Property, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden

@api.route('/properties/')
def get_properties():
    properties = Property.query.all()
    return jsonify({ 'properties': [property.to_json() for property in properties] })

@api.route('/properties/<int:id>')
def get_property(id):
    property = Property.get_or_404(id)
    return jsonify(property.to_json())

@api.route('/properties', methods=['POST'])
def add_property():
    property = Property.from_json(request.json)
    
    db.session.add(property)
    db.session.commit()
    
    return jsonify(property.to_json()), 201, \
        {'Location': url_for('api.get_property', id=property.id)}