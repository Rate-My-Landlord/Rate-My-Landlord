from app import db
from enum import unique
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), unique=True)
    first_name = db.Column(db.String(30), nullable=True)
    last_name = db.Column(db.String(30), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    
    # for debug purposes
    def __repr__(self):
        return '<User {}>'.format(self.id)
    
    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
        # for debug purposes
    def __repr__(self):
        return '<Review {}>'.format(self.id)