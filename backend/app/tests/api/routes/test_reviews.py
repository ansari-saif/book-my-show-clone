from app.tests.utils.movie import create_random_movie
from app.tests.utils.user import create_random_user
import json
from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.models import Review
from app import crud
from app.tests.utils.review import create_random_review
from app.tests.utils.utils import random_lower_string


def test_create_review(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    user = create_random_user(db)
    data = {
        "movie_id": movie.id,
        "user_id": user.id,
        "rating": 5,
        "review_text": random_lower_string(),
    }
    r = client.post(f"api/v1/reviews/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_review = r.json()
    review_in_db = crud.get_reviews_by_movie_id(session=db, movie_id=created_review["movie_id"])
    assert review_in_db
    assert str(review_in_db[0].user_id) == created_review["user_id"]


def test_get_reviews(client: TestClient, db: Session) -> None:
    review = create_random_review(db)
    r = client.get(f"api/v1/reviews/{review.id}")
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    api_reviews = r.json()
    assert len(api_reviews) > 0
    assert str(api_reviews["movie_id"]) == str(review.movie_id)


def test_update_review(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    review = create_random_review(db)
    new_review_text = random_lower_string()
    data = {"review_text": new_review_text}
    r = client.put(f"api/v1/reviews/{review.id}", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    updated_review = r.json()
    assert updated_review["review_text"] == new_review_text


def test_delete_review(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    review = create_random_review(db)
    r = client.delete(f"api/v1/reviews/{review.id}", headers=superuser_token_headers)
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    result = db.exec(select(Review).where(Review.id == review.id)).first()
    assert result is None
