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
    phone = db.Column(db.String(15), unique=True)
    first_name = db.Column(db.String(30), nullable=True)
    last_name = db.Column(db.String(30), nullable=True)
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
            'url': url_for('app.get_user', id=self.id),
            'first_name': self.first_name,
            'last_name': self.last_name,
        }
        return json_user
    
    # for debug purposes
    def __repr__(self):
        return '<User {}>'.format(self.id)
    
    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    text = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_json(self):
        json_review = {
            'url': url_for('app.get_review', id=self.id),
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at
        }
        return json_review
    
    @staticmethod
    def from_json(json_review):
        text = json_review.get('body')
        if text is None or text =='':
            raise ValidationError('review does not have text')
        return Review(text=text)
    
    
    # for debug purposes
    def __repr__(self):
        return '<Review {}>'.format(self.id)