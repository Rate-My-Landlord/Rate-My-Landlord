from typing import NamedTuple
from flask import json
from flask.globals import current_app
from flask.helpers import url_for
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.exceptions import ValidationError
from app import db
from enum import unique
from datetime import datetime


class Permission:
    FOLLOW = 1
    COMMENT = 2
    WRITE = 4
    MODERATE = 8
    ADMIN = 16

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def generate_auth_token(self, expiration):
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id}).decode('utf-8')
    
    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['id'])
    
    def to_json(self):
        json_user = {
            'url': url_for('api.get_user', id=self.id),
            'first_name': self.first_name,
            'last_name': self.last_name,
        }
        return json_user
    
    # for debug purposes
    def __repr__(self):
        return '<User {}>'.format(self.id)
    
    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True) # change to True later
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'), nullable=True) # change to True later
    overall_star_rating = db.Column(db.Integer)
    communication_star_rating = db.Column(db.Integer)
    maintenance_star_rating = db.Column(db.Integer)
    text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_json(self):
        json_review = {
            'url': url_for('api.get_review', id=self.id),
            'id': self.id,
            'overall_star_rating': self.overall_star_rating,
            'communication_star_rating': self.communication_star_rating,
            'maintenance_star_rating': self.maintenance_star_rating,
            'text': self.text,
            'created_at': self.created_at
        }
        return json_review
    
    @staticmethod
    def from_json(json_review):
        body = json_review.get('body')
        if body is None or body == '':
            raise ValidationError('Review has no body')
        
        review_items = { 'overall_star_rating': '',
            'communication_star_rating': '',
            'maintenance_star_rating': '',
            'text': ''}
        for key, _ in review_items.items():
            review_items[key] = body[key]
        
        return Review(overall_star_rating=review_items['overall_star_rating'],
                      communication_star_rating=review_items['communication_star_rating'],
                      maintenance_star_rating=review_items['maintenance_star_rating'],
                      text=review_items['text'])
    
    
    # for debug purposes
    def __repr__(self):
        return '<Review {}>'.format(self.id)
    
class Landlord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'))
    
    def to_json(self):
        json_landlord = {
            'url': url_for('api.get_landlord', id=self.id),
            'property_url': url_for('api.get_property', id=self.property_id),
            'user_url': url_for('api.get_user', id=self.user_id),
            'id': self.id,
        }
        return json_landlord
    
    # @staticmethod
    # def from_json(json_review):
    #     text = json_review.get('body')
    #     if text is None or text =='':
    #         raise ValidationError('review does not have text')
    #     return Landlord(text=text)
    
    
    # for debug purposes
    def __repr__(self):
        return '<Landlord {}>'.format(self.id)
    
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address_1 = db.Column(db.String(50))
    address_2 = db.Column(db.String(50))
    zip_code =  db.Column(db.String(5))
    state = db.Column(db.String(2))
    country =  db.Column(db.String(50))
    
    def to_json(self):
        json_property = {
            'url': url_for('api.get_property', id=self.id),
            'id': self.id,
            'address_1': self.address_1,
            'address_2': self.address_2,
            'zip_code': self.zip_code,
            'state': self.state,
            'country': self.country
        }
        return json_property