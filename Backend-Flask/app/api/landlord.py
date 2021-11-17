from flask import json, jsonify, request, g, url_for
from .. import db
from ..models import Landlord, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden


@api.route('/landlords/')
def get_landlords():
    landlords = Landlord.query.all()
    return jsonify({'landlords': [landlord.to_json() for landlord in landlords]})

@api.route('/landlords/<int:id>')
def get_landlord(id):
    landlord = Landlord.query.get_or_404(id)
    return jsonify(landlord.to_json())