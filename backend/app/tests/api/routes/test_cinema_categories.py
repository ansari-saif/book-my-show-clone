import json
from fastapi.testclient import TestClient
from sqlmodel import Session
from app import crud
from app.tests.utils.utils import random_lower_string


def test_create_cinema_category(client: TestClient, superuser_token_headers: dict[str, str], db: Session) -> None:
    data = {"category_name": random_lower_string()}
    r = client.post(f"api/v1/cinema_categories/", headers=superuser_token_headers, json=json.loads(json.dumps(data, default=str)))
    if r.status_code != 200:
        print(r.json())
    assert r.status_code == 200
    created_category = r.json()
    category_in_db = crud.get_cinema_category_by_id(session=db, category_id=created_category["id"])
    assert category_in_db
    assert category_in_db.category_name == created_category["category_name"]
