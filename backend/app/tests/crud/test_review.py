from sqlmodel import Session
from app import crud
from app.models import ReviewUpdate
from app.tests.utils.review import create_random_review
from app.tests.utils.utils import random_lower_string


def test_create_review(db: Session) -> None:
    review = create_random_review(db)
    assert review.user_id
    assert review.movie_id
    assert review.rating


def test_update_review(db: Session) -> None:
    review = create_random_review(db)
    new_review_text = random_lower_string()
    review_update = ReviewUpdate(review_text=new_review_text)
    updated_review = crud.update_review(session=db, db_review=review, review_in=review_update)
    assert updated_review.review_text == new_review_text


def test_get_review(db: Session) -> None:
    review = create_random_review(db)
    reviews_from_db = crud.get_reviews_by_movie_id(session=db, movie_id=review.movie_id)
    assert reviews_from_db
    assert reviews_from_db[0].movie_id == review.movie_id
