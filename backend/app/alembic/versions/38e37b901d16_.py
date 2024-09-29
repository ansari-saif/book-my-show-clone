"""empty message

Revision ID: 38e37b901d16
Revises: fbac18dbb638
Create Date: 2024-09-29 06:06:16.404194

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '38e37b901d16'
down_revision = 'fbac18dbb638'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('youmightalsolike')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('youmightalsolike',
    sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
    sa.Column('movie_id', sa.UUID(), autoincrement=False, nullable=True),
    sa.Column('related_movie_id', sa.UUID(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['movie_id'], ['movie.id'], name='youmightalsolike_movie_id_fkey'),
    sa.ForeignKeyConstraint(['related_movie_id'], ['movie.id'], name='youmightalsolike_related_movie_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='youmightalsolike_pkey')
    )
    # ### end Alembic commands ###
