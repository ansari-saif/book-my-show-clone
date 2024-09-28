from sqlmodel import Session
from app import crud
from app.models import MoviePricingUpdate
from app.tests.utils.movie_pricing import create_random_movie_pricing


def test_create_movie_pricing(db: Session) -> None:
    pricing = create_random_movie_pricing(db)
    assert pricing.movie_id
    assert pricing.cinema_id
    assert pricing.price


def test_update_movie_pricing(db: Session) -> None:
    pricing = create_random_movie_pricing(db)
    new_price = 300.00
    pricing_update = MoviePricingUpdate(price=new_price)
    updated_pricing = crud.update_movie_pricing(session=db, db_pricing=pricing, pricing_in=pricing_update)
    assert updated_pricing.price == new_price


def test_get_movie_pricing(db: Session) -> None:
    pricing = create_random_movie_pricing(db)
    pricing_from_db = crud.get_pricing_by_movie_cinema_category(
        session=db, movie_id=pricing.movie_id, cinema_id=pricing.cinema_id, category_id=pricing.category_id
    )
    assert pricing_from_db
    assert pricing_from_db.price == pricing.price