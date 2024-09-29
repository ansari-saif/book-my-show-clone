from app.tests.utils.cinema import create_random_cinema
from app.tests.utils.movie import create_random_movie
import json
from fastapi.testclient import TestClient
from sqlmodel import Session, select
from app.models import Show
from app import crud
from app.tests.utils.show import create_random_show
from datetime import datetime


def test_create_show(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    movie = create_random_movie(db)
    cinema = create_random_cinema(db)
    data = {
        "movie_id": str(movie.id),
        "screen_id": str(cinema.screens[0].id),
        "show_time": datetime.utcnow().isoformat(),
    }
    r = client.post(f"api/v1/shows/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_show = r.json()
    show_in_db = crud.get_show_by_id(session=db, show_id=created_show["id"])
    assert show_in_db
    assert str(show_in_db.movie_id) == created_show["movie_id"]


def test_get_show(client: TestClient, db: Session) -> None:
    show = create_random_show(db)
    r = client.get(f"api/v1/shows/{show.id}")
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    api_show = r.json()
    assert api_show["movie_id"] == str(show.movie_id)


def test_update_show(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    show = create_random_show(db)
    new_show_time = datetime.utcnow().isoformat()
    data = {"show_time": new_show_time}
    r = client.put(f"api/v1/shows/{show.id}", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    updated_show = r.json()
    assert updated_show["show_time"] == str(new_show_time)


def test_delete_show(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    show = create_random_show(db)
    r = client.delete(f"api/v1/shows/{show.id}", headers=superuser_token_headers)
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    result = db.exec(select(Show).where(Show.id == show.id)).first()
    assert result is None
