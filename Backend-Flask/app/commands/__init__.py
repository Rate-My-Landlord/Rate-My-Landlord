from flask import Blueprint
import click
from .. import db
from ..models import Landlord, Review, Property
from app import models


commands = Blueprint('commands', __name__)


@commands.cli.command('prototype')
def prototype():
    """ Inserts dummy data for prototype """
    click.echo('This will erase all data in the local database and insert dummy data')
    if click.confirm('Do you want to continue?'):
        models.User.query.delete()
        models.Review.query.delete()
        models.Property.query.delete()
        models.Landlord.query.delete()
        db.session.commit()
        
        # Landlords
        landlord_1 = Landlord(first_name='Joe', last_name='Schmoe', zipcode='05401')
        db.session.add(landlord_1)
        landlord_2 = Landlord(first_name='Peabody', last_name='Jones', zipcode='05401')
        db.session.add(landlord_2)
        landlord_3 = Landlord(first_name='Slum', last_name='Lord', zipcode='05401')
        db.session.add(landlord_3)
        db.session.commit()
        
        # Properties
        property_1 = Property(landlord_id=landlord_1.id,
                              address_1='1 Main Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_1)
        property_2 = Property(landlord_id=landlord_1.id,
                              address_1='1 North Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_2)
        property_3 = Property(landlord_id=landlord_2.id,
                              address_1='1 North Willard Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_3)
        property_4 = Property(landlord_id=landlord_2.id,
                              address_1='1 South Willard Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_4)
        property_5 = Property(landlord_id=landlord_3.id,
                              address_1='1 Pine Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_5)
        property_6 = Property(landlord_id=landlord_3.id,
                              address_1='1 Maple Street',
                              city='Burlington',
                              zip_code='05401',
                              state='VT',
                              country='US')
        db.session.add(property_6)        
        db.session.commit()
        
        # Reviews
        review_1 = Review(landlord_id=landlord_1.id,
                          property_id=property_1.id,
                          overall_star_rating=4,
                          communication_star_rating=5,
                          maintenance_star_rating=3,
                          text='Joe is a stand up guy, but this property was not well maintained')
        review_2 = Review(landlord_id=landlord_1.id,
                          property_id=property_2.id,
                          overall_star_rating=3,
                          communication_star_rating=4,
                          maintenance_star_rating=3,
                          text='Its fine, my apartment was not the nicest but Joe was a friendly guy')
        review_3 = Review(landlord_id=landlord_1.id,
                          overall_star_rating=4,
                          communication_star_rating=5,
                          maintenance_star_rating=3)
        review_4 = Review(landlord_id=landlord_2.id,
                        property_id=property_3.id,
                        overall_star_rating=2,
                        communication_star_rating=3,
                        maintenance_star_rating=1,
                        text='Peabody Jones is a stupid name, and his apartments are bad')
        review_5 = Review(landlord_id=landlord_2.id,
                        property_id=property_4.id,
                        overall_star_rating=3,
                        communication_star_rating=3,
                        maintenance_star_rating=3,
                        text='He is a fine landlord')
        review_6 = Review(landlord_id=landlord_2.id,
                        overall_star_rating=3,
                        communication_star_rating=3,
                        maintenance_star_rating=3,
                        text='Only landlord I\'ve had. He\'s alright')        
        review_7 = Review(landlord_id=landlord_2.id,
                        property_id=property_5.id,
                        overall_star_rating=1,
                        communication_star_rating=1,
                        maintenance_star_rating=1,
                        text='This guy is a slumlord')
        review_8 = Review(landlord_id=landlord_2.id,
                        property_id=property_6.id,
                        overall_star_rating=2,
                        communication_star_rating=2,
                        maintenance_star_rating=2,
                        text='Worst landlord I\'ve experienced')
        review_9 = Review(landlord_id=landlord_2.id,
                        overall_star_rating=2,
                        communication_star_rating=2,
                        maintenance_star_rating=1,
                        text='Not the best landlord')
        
        db.session.add(review_1)
        db.session.add(review_2)
        db.session.add(review_3)
        db.session.add(review_4)
        db.session.add(review_5)
        db.session.add(review_6)
        db.session.add(review_7)
        db.session.add(review_8)
        db.session.add(review_9)
        
        
        db.session.commit()
        
        click.echo('Added dummy data. 3 landlords, each with 2 properties and 3 reviews')