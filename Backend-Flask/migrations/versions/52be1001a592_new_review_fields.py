"""new review fields

Revision ID: 52be1001a592
Revises: beb6c58756f4
Create Date: 2022-04-08 11:54:28.197128

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '52be1001a592'
down_revision = 'beb6c58756f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('review', sa.Column('cost_of_rent_rating', sa.String(length=10), nullable=True))
    op.add_column('review', sa.Column('entry_without_notice', sa.Boolean(), nullable=True))
    op.alter_column('review', 'landlord_id',
               existing_type=mysql.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('review', 'landlord_id',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.drop_column('review', 'entry_without_notice')
    op.drop_column('review', 'cost_of_rent_rating')
    # ### end Alembic commands ###
