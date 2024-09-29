import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.movie import create_random_movie


def test_create_movie_image(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    data = {
        "movie_id": str(movie.id),
        "image_url": "/images/test.jpg",
        "image_type": "poster",
        "category_id": "poster",
    }
    r = client.post(f"api/v1/movie_images/", headers=superuser_token_headers,
                    json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_image = r.json()
    image_in_db = crud.get_movie_image_by_id(
        session=db, image_id=created_image["id"])
    assert image_in_db
    assert image_in_db.image_url == created_image["image_url"]
