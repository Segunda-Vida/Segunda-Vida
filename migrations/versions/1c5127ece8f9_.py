"""empty message

Revision ID: 1c5127ece8f9
Revises: 6bde906dfcc9
Create Date: 2021-09-24 16:40:26.111903

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c5127ece8f9'
down_revision = '6bde906dfcc9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('product_image_url', sa.String(length=255), nullable=True))
    op.drop_column('user', 'profile_image_url')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('profile_image_url', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
    op.drop_column('product', 'product_image_url')
    # ### end Alembic commands ###
