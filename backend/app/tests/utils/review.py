from sqlmodel import Session
from app import crud
from app.models import Review, ReviewCreate
from app.tests.utils.utils import random_lower_string
from app.tests.utils.movie import create_random_movie
from app.tests.utils.user import create_random_user


def create_random_review(db: Session) -> Review:
    movie = create_random_movie(db)
    user = create_random_user(db)
    review_in = ReviewCreate(
        user_id=user.id,
        movie_id=movie.id,
        rating=5,
        review_text=random_lower_string(),
        is_top_review=False
    )
    review = crud.create_review(session=db, review_create=review_in)
    return review
