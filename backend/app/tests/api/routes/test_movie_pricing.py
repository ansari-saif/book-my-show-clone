from sqlmodel import Session
from app import crud
from app.models import MoviePricingUpdate
from app.tests.utils.movie_pricing import create_random_movie_pricing


def test_create_movie_pricing(db: Session) -> None:
    movie_pricing = create_random_movie_pricing(db)
    assert movie_pricing.price


def test_update_movie_pricing(db: Session) -> None:
    movie_pricing = create_random_movie_pricing(db)
    new_price = 300.00
    movie_pricing_update = MoviePricingUpdate(price=new_price)
    updated_pricing = crud.update_movie_pricing(session=db, db_pricing=movie_pricing, pricing_in=movie_pricing_update)
    assert updated_pricing.price == new_price


def test_get_movie_pricing(db: Session) -> None:
    movie_pricing = create_random_movie_pricing(db)
    pricing_from_db = crud.get_movie_pricing_by_id(session=db, pricing_id=movie_pricing.id)
    assert pricing_from_db
    assert pricing_from_db.price == movie_pricing.price
