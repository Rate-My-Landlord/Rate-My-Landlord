import enum
from flask.helpers import url_for
from app.exceptions import ValidationError
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import phonenumbers
import re
from sqlalchemy.orm import backref
from sqlalchemy import Enum, desc
from .search import *


class SearchableMixin(object):
    @classmethod
    def search(cls, expression):
        ids, total = query_index(cls.__tablename__, expression)
        if total == 0:
            return cls.query.filter_by(id=0), 0
        when = []
        for i in range(len(ids)):
            when.append((ids[i], i))
        return cls.query.filter(cls.id.in_(ids)).order_by(
            db.case(when, value=cls.id)).all(), total

    @classmethod
    def before_commit(cls, session):
        session._changes = {
            'add': list(session.new),
            'update': list(session.dirty),
            'delete': list(session.deleted)
        }

    @classmethod
    def after_commit(cls, session):
        for obj in session._changes['add']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['update']:
            if isinstance(obj, SearchableMixin):
                add_to_index(obj.__tablename__, obj)
        for obj in session._changes['delete']:
            if isinstance(obj, SearchableMixin):
                remove_from_index(obj.__tablename__, obj)
        session._changes = None

    @classmethod
    def reindex(cls):
        for obj in cls.query:
            add_to_index(cls.__tablename__, obj)


db.event.listen(db.session, 'before_commit', SearchableMixin.before_commit)
db.event.listen(db.session, 'after_commit', SearchableMixin.after_commit)


class ExternalAuth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    provider = db.Column(db.String(30))
    external_id = db.Column(db.Text)
    user = db.relationship('User', backref=backref(
        "externalAuth", uselist=False))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(128))  # hash
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # one to many relationship
    reviews = db.relationship('Review', backref='user')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def is_external_auth(self):
        return ExternalAuth.query.filter(ExternalAuth.user_id == self.id) is not None

    def to_json(self, brief=False):
        json_user = {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'reviews': [review.to_json for review in self.reviews],
            'created_at': self.created_at
        }
        # If not brief, include personal info
        if not brief:
            if self.phone[:2] == '+1':
                # Splicing the +1 off of the phone
                json_user['phone'] = self.phone[2:]
            else:
                json_user['phone'] = self.phone
            json_user['email'] = self.email
        return json_user

    @staticmethod
    def from_json(json_user):
        body = json_user.get('body')
        if body is None or body == '':
            raise ValidationError('User has no body')

        user_items = {'phone': '',
                      'first_name': '',
                      'last_name': '',
                      'email': ''}

        for key, _ in user_items.items():
            user_items[key] = body.get(key)
            if user_items[key] is None or user_items[key] == '':
                raise ValidationError('User has no {}'.format(key))

        # Formatting phone to E.164 format
        user_items['phone'] = '+1{}'.format(
            re.sub('[^0-9]', '', user_items['phone']))
        # Validating phone
        User.validate_phone(user_items['phone'])
        # Validating email
        User.validate_email(user_items['email'])

        pw = body.get('password')
        if pw is None or pw == '':
            raise ValidationError('User has no password')

        new_user = User(phone=user_items['phone'],
                        first_name=user_items['first_name'],
                        last_name=user_items['last_name'],
                        email=user_items['email'])

        # Setting password
        new_user.set_password(pw)

        return new_user

    @staticmethod
    def validate_email(email):
        user = User.query.filter(User.email == email).first()
        if user is not None:
            raise ValidationError('Email already in use')

    @staticmethod
    def format_phone(phone):
        return '+1{}'.format(re.sub('[^0-9]', '', phone))

    @staticmethod
    def validate_phone(phone):
        # https://stackoverflow.com/questions/36251149/validating-us-phone-number-in-wtforms
        # Phone too long
        if len(phone) > 16:
            raise ValidationError('Invalid phone number')
        # Checking if phone already exist
        user = User.query.filter(User.phone == phone).first()
        if user is not None:
            raise ValidationError('Phone Number already in use')

        # Checking if it is a valid phone number
        input_number = phonenumbers.parse(phone)
        if not (phonenumbers.is_valid_number(input_number)):
            raise ValidationError('Invalid phone number')

    # for debug purposes
    def __repr__(self):
        return '<User {}>'.format(self.id)

    @staticmethod
    def onboard_user(phone, email, first_name, last_name):
        phone = User.format_phone(phone)
        User.validate_phone(phone)
        new_user = User(phone=phone,
                        first_name=first_name,
                        last_name=last_name,
                        email=email)
        return new_user


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    landlord_id = db.Column(db.Integer, db.ForeignKey(
        'landlord.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'))
    overall_star_rating = db.Column(db.Integer)
    communication_star_rating = db.Column(db.Integer)
    maintenance_star_rating = db.Column(db.Integer)
    entry_without_notice = db.Column(db.Boolean)
    cost_of_rent_rating = db.Column(db.String(10))
    text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author = db.relationship('User', backref='review',
                             uselist=False, lazy=True, viewonly=True, sync_backref=False)

    def to_json(self):
        landlord = Landlord.query.get(self.landlord_id)
        json_review = {
            'id': self.id,
            'landlord': landlord.to_json(brief=True),
            'overall_star_rating': self.overall_star_rating,
            'communication_star_rating': self.communication_star_rating,
            'maintenance_star_rating': self.maintenance_star_rating,
            'entry_without_notice': self.entry_without_notice,
            'cost_of_rent_rating': self.cost_of_rent_rating,
            'text': self.text,
            'created_at': self.created_at}
        if (self.author_id):
            json_review['author'] = self.author.to_json(brief=True)
        if (self.property_id):
            json_review['property'] = Property.query.get(
                self.property_id).to_json()
        return json_review

    @staticmethod
    def reviews_for_landlord(landlord_id):
        return Review.query.filter(Review.landlord_id == landlord_id).order_by(desc(Review.created_at)).all()

    @staticmethod
    def from_json(json_review):
        body = json_review.get('body')
        if body is None or body == '':
            raise ValidationError('Review has no body')

        review_items = {'author_id': '',
                        'landlord_id': '',
                        'property_id': '',
                        'overall_star_rating': '',
                        'communication_star_rating': '',
                        'maintenance_star_rating': '',
                        'text': ''}
        for key, _ in review_items.items():
            review_items[key] = body.get(key)

        if review_items['landlord_id'] is None:
            raise ValidationError('Review has not landlord')

        # if review_items['author_id'] is None:
        #     raise ValidationError('Review has not author')

        return Review(landlord_id=review_items['landlord_id'],
                      property_id=review_items['property_id'],
                      #   author_id=review_items['author_id'],
                      overall_star_rating=review_items['overall_star_rating'],
                      communication_star_rating=review_items['communication_star_rating'],
                      maintenance_star_rating=review_items['maintenance_star_rating'],
                      text=review_items['text'])

    # for debug purposes

    def __repr__(self):
        return '<Review {}>'.format(self.id)


class Landlord(SearchableMixin, db.Model):
    __searchable__ = ['first_name', 'last_name', 'zipcode']

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    zipcode = db.Column(db.String(5))
    # one to many relationship
    properties = db.relationship('Property', backref='landlord')
    # one to many relationship
    reviews = db.relationship(
        'Review', backref='landlord', order_by="Review.created_at.desc()")

    def to_json(self, brief=False):
        json_landlord = {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'zip_code': self.zipcode,
            'overall_rating': self.getOverallRating(),
        }
        if not brief:
            json_landlord['properties'] = [property.to_json()
                                           for property in self.properties]
            json_landlord['reviews'] = [review.to_json()
                                        for review in self.reviews]
        return json_landlord

    @staticmethod
    def from_json(json_review):
        body = json_review.get('body')
        if body is None or body == '':
            raise ValidationError('review does not have text')
        landlord_items = {'first_name': '',
                          'last_name': '',
                          'user_id': '',
                          'zipcode': ''}
        for key, _ in landlord_items.items():
            landlord_items[key] = body.get(key)
        if landlord_items['user_id'] is not None and landlord_items['user_id'] != '':
            user = User.query.get(landlord_items['user_id'])
            if user is None:
                raise ValidationError('user does not exist')

        return Landlord(user_id=landlord_items['user_id'],
                        first_name=landlord_items['first_name'],
                        last_name=landlord_items['last_name'],
                        zipcode=landlord_items['zipcode'])

    def getOverallRating(self):
        if len(self.reviews) == 0:
            return 0
        overall_rating = 0
        for review in self.reviews:
            overall_rating += review.overall_star_rating
        return round(int(overall_rating)/len(self.reviews), 1)

    @staticmethod
    def landlord_exists(landlord_id):
        return Landlord.query.get(landlord_id) is not None

    # for debug purposes
    def __repr__(self):
        return '<Landlord {}>'.format(self.id)


class Property(SearchableMixin, db.Model):
    __searchable__ = ['address_1', 'city', 'state', 'zipcode']

    id = db.Column(db.Integer, primary_key=True)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'))
    address_1 = db.Column(db.String(50))
    address_2 = db.Column(db.String(50))
    city = db.Column(db.String(30))
    zipcode = db.Column(db.String(5))
    state = db.Column(db.String(2))
    country = db.Column(db.String(50))

    def to_json(self):
        landlord = Landlord.query.get(self.landlord_id)
        json_property = {
            'id': self.id,
            'landlord': landlord.to_json(brief=True),
            'address_1': self.address_1,
            'address_2': self.address_2,
            'city': self.city,
            'zip_code': self.zipcode,
            'state': self.state,
            'country': self.country}

        return json_property

    @staticmethod
    def from_json(json_property):
        body = json_property.get('body')
        if body is None or body == '':
            raise ValidationError('Property has no body')
        property_items = {'landlord_id': '',
                          'address_1': '',
                          'address_2': '',
                          'city': '',
                          'zipcode': '',
                          'state': '',
                          'country': ''}
        for key, _ in property_items.items():
            property_items[key] = body.get(key)

        if property_items['landlord_id'] is not None and property_items['landlord_id'] != '':
            landlord = Landlord.query.get(property_items['landlord_id'])
            if landlord is None:
                raise ValidationError('Lanlord does not exist')
        else:
            raise ValidationError('No landlord provided')

        return Property(address_1=property_items['address_1'],
                        address_2=property_items['address_2'],
                        city=property_items['city'],
                        zipcode=property_items['zipcode'],
                        state=property_items['state'],
                        country=property_items['country'])

    @staticmethod
    def property_exists(address_1, city, state, zip_code, country):
        property = Property.query.filter(Property.address_1 == address_1,
                                         Property.city == city,
                                         Property.state == state,
                                         Property.zipcode == zip_code,
                                         Property.country == country).all()

        return len(property) > 0

    # for debug purposes
    def __repr__(self):
        return '<Property {}>'.format(self.id)
