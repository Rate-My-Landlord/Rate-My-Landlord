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