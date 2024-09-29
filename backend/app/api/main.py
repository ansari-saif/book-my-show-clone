from fastapi import APIRouter

from app.api.routes import (
    login,
    users,
    utils,
    movies,
    movies_format,
    movie_images,
    home_page_data,
    cities,
    cinemas,
    cinema_categories,
    screens,
    seats,
    shows,
    movie_pricing,
    crew,
    cast,
    reviews,
    bookings,
    booking_details,
    payments,
)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(movies.router, prefix="/movies", tags=["movies"])
api_router.include_router(movies_format.router, prefix="/movies_format", tags=["movies_format"])
api_router.include_router(movie_images.router, prefix="/movie_images", tags=["movie_images"])
api_router.include_router(home_page_data.router, prefix="/home_page_data", tags=["home_page_data"])
api_router.include_router(cities.router, prefix="/cities", tags=["cities"])
api_router.include_router(cinemas.router, prefix="/cinemas", tags=["cinemas"])
api_router.include_router(cinema_categories.router, prefix="/cinema_categories", tags=["cinema_categories"])
api_router.include_router(screens.router, prefix="/screens", tags=["screens"])
api_router.include_router(seats.router, prefix="/seats", tags=["seats"])
api_router.include_router(shows.router, prefix="/shows", tags=["shows"])
api_router.include_router(movie_pricing.router, prefix="/movie_pricing", tags=["movie_pricing"])
api_router.include_router(crew.router, prefix="/crew", tags=["crew"])
api_router.include_router(cast.router, prefix="/cast", tags=["cast"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(booking_details.router, prefix="/booking_details", tags=["booking_details"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
