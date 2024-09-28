from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.models import Movie
from app import crud
from app.tests.utils.movie import create_random_movie
from app.tests.utils.utils import random_lower_string


def test_create_movie(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    data = {
        "title": random_lower_string(),
        "genre": random_lower_string(),
        "duration": 120,
        "description": random_lower_string(),
    }
    r = client.post(f"/movies/", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    created_movie = r.json()
    movie_in_db = crud.get_movie_by_id(session=db, movie_id=created_movie["id"])
    assert movie_in_db
    assert movie_in_db.title == created_movie["title"]


def test_get_movie(client: TestClient, db: Session) -> None:
    movie = create_random_movie(db)
    r = client.get(f"/movies/{movie.id}")
    assert r.status_code == 200
    api_movie = r.json()
    assert api_movie["title"] == movie.title


def test_update_movie(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    new_title = random_lower_string()
    data = {"title": new_title}
    r = client.patch(f"/movies/{movie.id}", headers=superuser_token_headers, json=data)
    assert r.status_code == 200
    updated_movie = r.json()
    assert updated_movie["title"] == new_title


def test_delete_movie(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    r = client.delete(f"/movies/{movie.id}", headers=superuser_token_headers)
    assert r.status_code == 200
    result = db.exec(select(Movie).where(Movie.id == movie.id)).first()
    assert result is None
