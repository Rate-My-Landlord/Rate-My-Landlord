from flask.helpers import url_for
from app.exceptions import ValidationError
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import phonenumbers, re

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
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(128)) # hash
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    
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
        user_items['phone'] = '+1{}'.format(re.sub('[^0-9]', '', user_items['phone']))
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
        user = User.query.filter(User.email==email).first()
        if user is not None:
            raise ValidationError('Email already in use')
    
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
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=True) # change to True later
    overall_star_rating = db.Column(db.Integer)
    communication_star_rating = db.Column(db.Integer)
    maintenance_star_rating = db.Column(db.Integer)
    text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    landlord = db.relationship('Landlord', backref='review', uselist=False, lazy=True)
    
    def to_json(self):
        author_url = None
        if self.author_id is not None:
            author_url = url_for('api.get_user', id=self.author_id)
        landlord_url = None
        if self.landlord_id is not None:
            landlord_url = url_for('api.get_landlord', id=self.landlord_id)
        property_url = None
        if self.property_id is not None:
            property_url = url_for('api.get_property', id=self.property_id)
        
        json_review = {
            'url': url_for('api.get_review', id=self.id),
            'author_url': author_url,
            'landlord_url': landlord_url,
            'property_url': property_url,
            'id': self.id,
            'author_id': self.author_id,
            'landlord_id': self.landlord_id,
            'property_id': self.property_id,
            'overall_star_rating': self.overall_star_rating,
            'communication_star_rating': self.communication_star_rating,
            'maintenance_star_rating': self.maintenance_star_rating,
            'text': self.text,
            'created_at': self.created_at,
            'landlord': self.landlord.to_json(brief=True)}
        return json_review
    
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
    
class Landlord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    zipcode = db.Column(db.String(5))
    
    def to_json(self, brief=False):
        user_url = None
        if self.user_id is not None:
            user_url = url_for('api.get_user')
        json_landlord = {
            'url': url_for('api.get_landlord', id=self.id),
            'user_url': user_url,
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'zipcode': self.zipcode,
            'overall_rating': self.getOverallRating()}
        # if brief, do not include all of the landlords reviews and properties
        if not brief:
            properties  = Property.query.filter_by(landlord_id=self.id)
            reviews = Review.query.filter_by(landlord_id=self.id)
            json_landlord['properties'] = [property.to_json() for property in properties]
            json_landlord['reviews'] = [review.to_json() for review in reviews]
        return json_landlord
    
    @staticmethod
    def from_json(json_review):
        body = json_review.get('body')
        if body is None or body =='':
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
        reviews = Review.query.filter(Review.landlord_id==self.id)
        if reviews.count() == 0:
            return 0
        overall_rating = 0
        for review in reviews:
            overall_rating += review.overall_star_rating
        return round(int(overall_rating)/reviews.count(), 1)
    
    # for debug purposes
    def __repr__(self):
        return '<Landlord {}>'.format(self.id)
    
class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'))
    address_1 = db.Column(db.String(50))
    address_2 = db.Column(db.String(50))
    city = db.Column(db.String(30))
    zipcode =  db.Column(db.String(5))
    state = db.Column(db.String(2))
    country =  db.Column(db.String(50))
    
    def to_json(self):
        landlord_url = ''
        if self.landlord_id is not None:
            landlord_url = url_for('api.get_landlord', id=self.landlord_id)
            
        json_property = {
            'url': url_for('api.get_property', id=self.id),
            'landlord_url': landlord_url,
            'id': self.id,
            'landlord_id': self.landlord_id,
            'address_1': self.address_1,
            'address_2': self.address_2,
            'city': self.city,
            'zipcode': self.zipcode,
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
        
    # for debug purposes
    def __repr__(self):
        return '<Property {}>'.format(self.id)