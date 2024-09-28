from sqlmodel import Session
from app import crud
from app.models import MoviePricing, MoviePricingCreate
from app.tests.utils.movie import create_random_movie
from app.tests.utils.cinema import create_random_cinema
from app.tests.utils.movie_format import create_random_movie_format


def create_random_movie_pricing(db: Session) -> MoviePricing:
    movie = create_random_movie(db)
    cinema = create_random_cinema(db)
    movie_format = create_random_movie_format(db)
    pricing_in = MoviePricingCreate(
        movie_id=movie.id,
        cinema_id=cinema.id,
        category_id=None,  # Assuming we don't have categories yet
        format_id=movie_format.id,
        price=200.00  # Example price
    )
    pricing = crud.create_movie_pricing(session=db, pricing_create=pricing_in)
    return pricing
