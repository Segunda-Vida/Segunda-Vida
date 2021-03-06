"""empty message

Revision ID: 6fa942951173
Revises: dcf0f689f04f
Create Date: 2021-11-25 22:06:29.248856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fa942951173'
down_revision = 'dcf0f689f04f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('postal_code', sa.String(length=5), nullable=False))
    op.add_column('user', sa.Column('direction', sa.String(length=250), nullable=False))
    op.add_column('user', sa.Column('poblation', sa.String(length=250), nullable=False))
    op.add_column('user', sa.Column('provence', sa.String(length=250), nullable=False))
    op.create_unique_constraint(None, 'user', ['direction'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'provence')
    op.drop_column('user', 'poblation')
    op.drop_column('user', 'direction')
    op.drop_column('user', 'postal_code')
    # ### end Alembic commands ###
