"""added landlord and property tables, modified review table for testing

Revision ID: 4a70629653e5
Revises: 645bd97865b5
Create Date: 2021-11-17 17:06:38.316671

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4a70629653e5'
down_revision = '645bd97865b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('property',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address_1', sa.String(length=50), nullable=True),
    sa.Column('address_2', sa.String(length=50), nullable=True),
    sa.Column('zip_code', sa.String(length=5), nullable=True),
    sa.Column('state', sa.String(length=2), nullable=True),
    sa.Column('country', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('landlord',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('review', sa.Column('author_id', sa.Integer(), nullable=True))
    op.add_column('review', sa.Column('landlord_id', sa.Integer(), nullable=True))
    op.add_column('review', sa.Column('overall_start_rating', sa.Integer(), nullable=True))
    op.add_column('review', sa.Column('communication_star_rating', sa.Integer(), nullable=True))
    op.add_column('review', sa.Column('maintenance_star_rating', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'review', 'landlord', ['landlord_id'], ['id'])
    op.create_foreign_key(None, 'review', 'user', ['author_id'], ['id'])
    op.alter_column('user', 'phone',
               existing_type=mysql.VARCHAR(length=15),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'phone',
               existing_type=mysql.VARCHAR(length=15),
               nullable=True)
    op.drop_constraint(None, 'review', type_='foreignkey')
    op.drop_constraint(None, 'review', type_='foreignkey')
    op.drop_column('review', 'maintenance_star_rating')
    op.drop_column('review', 'communication_star_rating')
    op.drop_column('review', 'overall_start_rating')
    op.drop_column('review', 'landlord_id')
    op.drop_column('review', 'author_id')
    op.drop_table('landlord')
    op.drop_table('property')
    # ### end Alembic commands ###
