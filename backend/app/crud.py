from typing import Any, List, Optional
import uuid
from sqlmodel import Session, select
from app.core.security import get_password_hash, verify_password

from app.models import (
    User, UserCreate, UserUpdate,
    Movie, MovieCreate, MovieUpdate,
    Cinema, CinemaCreate, CinemaUpdate,
    Show, ShowCreate, ShowUpdate,
    Review, ReviewCreate, ReviewUpdate,
    MovieFormat, MovieFormatCreate, MovieFormatUpdate,
    MoviePricing, MoviePricingCreate, MoviePricingUpdate,
    BookingDetail, BookingDetailCreate, BookingDetailUpdate,
    Booking, BookingCreate, BookingUpdate,
    Cast, CastCreate, CastUpdate,
    CinemaCategory, CinemaCategoryCreate, CinemaCategoryUpdate,
    City, CityCreate, CityUpdate,
    Crew, CrewCreate, CrewUpdate,
    HomePageData, HomePageDataCreate, HomePageDataUpdate,
    MovieImage, MovieImageCreate, MovieImageUpdate,
    Payment, PaymentCreate, PaymentUpdate,
    Screen, ScreenCreate, ScreenUpdate,
    Seat, SeatCreate, SeatUpdate
)


# ------------------ User CRUD ------------------

def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def get_user_by_email(*, session: Session, email: str) -> Optional[User]:
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()


# ------------------ Movie CRUD ------------------

def create_movie(*, session: Session, movie_create: MovieCreate) -> Movie:
    db_movie = Movie.model_validate(movie_create)
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie


def update_movie(*, session: Session, db_movie: Movie, movie_in: MovieUpdate) -> Movie:
    movie_data = movie_in.model_dump(exclude_unset=True)
    db_movie.sqlmodel_update(movie_data)
    session.add(db_movie)
    session.commit()
    session.refresh(db_movie)
    return db_movie


def get_movie_by_id(*, session: Session, movie_id: uuid.UUID) -> Optional[Movie]:
    statement = select(Movie).where(Movie.id == movie_id)
    return session.exec(statement).first()


def get_movies(*, session: Session, limit: int = 100) -> List[Movie]:
    statement = select(Movie).limit(limit)
    return session.exec(statement).all()


# ------------------ Cinema CRUD ------------------

def create_cinema(*, session: Session, cinema_create: CinemaCreate) -> Cinema:
    db_cinema = Cinema.model_validate(cinema_create)
    session.add(db_cinema)
    session.commit()
    session.refresh(db_cinema)
    return db_cinema


def update_cinema(*, session: Session, db_cinema: Cinema, cinema_in: CinemaUpdate) -> Cinema:
    cinema_data = cinema_in.model_dump(exclude_unset=True)
    db_cinema.sqlmodel_update(cinema_data)
    session.add(db_cinema)
    session.commit()
    session.refresh(db_cinema)
    return db_cinema


def get_cinema_by_id(*, session: Session, cinema_id: uuid.UUID) -> Optional[Cinema]:
    statement = select(Cinema).where(Cinema.id == cinema_id)
    return session.exec(statement).first()


def get_cinemas(*, session: Session, limit: int = 100) -> List[Cinema]:
    statement = select(Cinema).limit(limit)
    return session.exec(statement).all()


# ------------------ Show CRUD ------------------

def create_show(*, session: Session, show_create: ShowCreate) -> Show:
    db_show = Show.model_validate(show_create)
    session.add(db_show)
    session.commit()
    session.refresh(db_show)
    return db_show


def update_show(*, session: Session, db_show: Show, show_in: ShowUpdate) -> Show:
    show_data = show_in.model_dump(exclude_unset=True)
    db_show.sqlmodel_update(show_data)
    session.add(db_show)
    session.commit()
    session.refresh(db_show)
    return db_show


def get_show_by_id(*, session: Session, show_id: uuid.UUID) -> Optional[Show]:
    statement = select(Show).where(Show.id == show_id)
    return session.exec(statement).first()


def get_shows(*, session: Session, limit: int = 100) -> List[Show]:
    statement = select(Show).limit(limit)
    return session.exec(statement).all()


# ------------------ Review CRUD ------------------

def create_review(*, session: Session, review_create: ReviewCreate) -> Review:
    db_review = Review.model_validate(review_create)
    session.add(db_review)
    session.commit()
    session.refresh(db_review)
    return db_review


def update_review(*, session: Session, db_review: Review, review_in: ReviewUpdate) -> Review:
    review_data = review_in.model_dump(exclude_unset=True)
    db_review.sqlmodel_update(review_data)
    session.add(db_review)
    session.commit()
    session.refresh(db_review)
    return db_review


def get_reviews_by_movie_id(*, session: Session, movie_id: uuid.UUID, limit: int = 100) -> List[Review]:
    statement = select(Review).where(Review.movie_id == movie_id).limit(limit)
    return session.exec(statement).all()


# ------------------ Movie Format CRUD ------------------

def create_movie_format(*, session: Session, format_create: MovieFormatCreate) -> MovieFormat:
    db_format = MovieFormat.model_validate(format_create)
    session.add(db_format)
    session.commit()
    session.refresh(db_format)
    return db_format


def update_movie_format(*, session: Session, db_format: MovieFormat, format_in: MovieFormatUpdate) -> MovieFormat:
    format_data = format_in.model_dump(exclude_unset=True)
    db_format.sqlmodel_update(format_data)
    session.add(db_format)
    session.commit()
    session.refresh(db_format)
    return db_format


def get_movie_format_by_id(*, session: Session, format_id: uuid.UUID) -> Optional[MovieFormat]:
    statement = select(MovieFormat).where(MovieFormat.id == format_id)
    return session.exec(statement).first()


# ------------------ Movie Pricing CRUD ------------------

def create_movie_pricing(*, session: Session, pricing_create: MoviePricingCreate) -> MoviePricing:
    db_pricing = MoviePricing.model_validate(pricing_create)
    session.add(db_pricing)
    session.commit()
    session.refresh(db_pricing)
    return db_pricing


def update_movie_pricing(*, session: Session, db_pricing: MoviePricing, pricing_in: MoviePricingUpdate) -> MoviePricing:
    pricing_data = pricing_in.model_dump(exclude_unset=True)
    db_pricing.sqlmodel_update(pricing_data)
    session.add(db_pricing)
    session.commit()
    session.refresh(db_pricing)
    return db_pricing


def get_pricing_by_movie_cinema_category(
    *, session: Session, movie_id: uuid.UUID, cinema_id: uuid.UUID, category_id: uuid.UUID
) -> Optional[MoviePricing]:
    statement = select(MoviePricing).where(
        MoviePricing.movie_id == movie_id,
        MoviePricing.cinema_id == cinema_id,
        MoviePricing.category_id == category_id
    )
    return session.exec(statement).first()


# ------------------ Booking Detail CRUD ------------------

def get_booking_detail_by_id(*, session: Session, detail_id: uuid.UUID) -> Optional[BookingDetail]:
    statement = select(BookingDetail).where(BookingDetail.id == detail_id)
    return session.exec(statement).first()


def create_booking_detail(*, session: Session, booking_detail_create: BookingDetailCreate) -> BookingDetail:
    db_booking_detail = BookingDetail.model_validate(booking_detail_create)
    session.add(db_booking_detail)
    session.commit()
    session.refresh(db_booking_detail)
    return db_booking_detail


def update_booking_detail(*, session: Session, db_booking_detail: BookingDetail, booking_detail_in: BookingDetailUpdate) -> BookingDetail:
    booking_detail_data = booking_detail_in.model_dump(exclude_unset=True)
    db_booking_detail.sqlmodel_update(booking_detail_data)
    session.add(db_booking_detail)
    session.commit()
    session.refresh(db_booking_detail)
    return db_booking_detail


# ------------------ Booking CRUD ------------------

def get_booking_by_id(*, session: Session, booking_id: uuid.UUID) -> Optional[Booking]:
    statement = select(Booking).where(Booking.id == booking_id)
    return session.exec(statement).first()


def create_booking(*, session: Session, booking_create: BookingCreate) -> Booking:
    db_booking = Booking.model_validate(booking_create)
    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking


def update_booking(*, session: Session, db_booking: Booking, booking_in: BookingUpdate) -> Booking:
    booking_data = booking_in.model_dump(exclude_unset=True)
    db_booking.sqlmodel_update(booking_data)
    session.add(db_booking)
    session.commit()
    session.refresh(db_booking)
    return db_booking


# ------------------ Cast CRUD ------------------

def get_cast_by_id(*, session: Session, cast_id: uuid.UUID) -> Optional[Cast]:
    statement = select(Cast).where(Cast.id == cast_id)
    return session.exec(statement).first()


def create_cast(*, session: Session, cast_create: CastCreate) -> Cast:
    db_cast = Cast.model_validate(cast_create)
    session.add(db_cast)
    session.commit()
    session.refresh(db_cast)
    return db_cast


def update_cast(*, session: Session, db_cast: Cast, cast_in: CastUpdate) -> Cast:
    cast_data = cast_in.model_dump(exclude_unset=True)
    db_cast.sqlmodel_update(cast_data)
    session.add(db_cast)
    session.commit()
    session.refresh(db_cast)
    return db_cast


# ------------------ Cinema Category CRUD ------------------

def get_cinema_category_by_id(*, session: Session, category_id: uuid.UUID) -> Optional[CinemaCategory]:
    statement = select(CinemaCategory).where(CinemaCategory.id == category_id)
    return session.exec(statement).first()


def create_cinema_category(*, session: Session, category_create: CinemaCategoryCreate) -> CinemaCategory:
    db_category = CinemaCategory.model_validate(category_create)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


def update_cinema_category(*, session: Session, db_category: CinemaCategory, category_in: CinemaCategoryUpdate) -> CinemaCategory:
    category_data = category_in.model_dump(exclude_unset=True)
    db_category.sqlmodel_update(category_data)
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category


# ------------------ City CRUD ------------------

def get_city_by_id(*, session: Session, city_id: uuid.UUID) -> Optional[City]:
    statement = select(City).where(City.id == city_id)
    return session.exec(statement).first()


def create_city(*, session: Session, city_create: CityCreate) -> City:
    db_city = City.model_validate(city_create)
    session.add(db_city)
    session.commit()
    session.refresh(db_city)
    return db_city


def update_city(*, session: Session, db_city: City, city_in: CityUpdate) -> City:
    city_data = city_in.model_dump(exclude_unset=True)
    db_city.sqlmodel_update(city_data)
    session.add(db_city)
    session.commit()
    session.refresh(db_city)
    return db_city


# ------------------ Crew CRUD ------------------

def get_crew_by_id(*, session: Session, crew_id: uuid.UUID) -> Optional[Crew]:
    statement = select(Crew).where(Crew.id == crew_id)
    return session.exec(statement).first()


def create_crew(*, session: Session, crew_create: CrewCreate) -> Crew:
    db_crew = Crew.model_validate(crew_create)
    session.add(db_crew)
    session.commit()
    session.refresh(db_crew)
    return db_crew


def update_crew(*, session: Session, db_crew: Crew, crew_in: CrewUpdate) -> Crew:
    crew_data = crew_in.model_dump(exclude_unset=True)
    db_crew.sqlmodel_update(crew_data)
    session.add(db_crew)
    session.commit()
    session.refresh(db_crew)
    return db_crew


# ------------------ Home Page Data CRUD ------------------

def get_home_page_data_by_id(*, session: Session, data_id: uuid.UUID) -> Optional[HomePageData]:
    statement = select(HomePageData).where(HomePageData.id == data_id)
    return session.exec(statement).first()


def create_home_page_data(*, session: Session, home_page_data_create: HomePageDataCreate) -> HomePageData:
    db_home_page_data = HomePageData.model_validate(home_page_data_create)
    session.add(db_home_page_data)
    session.commit()
    session.refresh(db_home_page_data)
    return db_home_page_data


def update_home_page_data(*, session: Session, db_home_page_data: HomePageData, home_page_data_in: HomePageDataUpdate) -> HomePageData:
    home_page_data_data = home_page_data_in.model_dump(exclude_unset=True)
    db_home_page_data.sqlmodel_update(home_page_data_data)
    session.add(db_home_page_data)
    session.commit()
    session.refresh(db_home_page_data)
    return db_home_page_data


# ------------------ Movie Image CRUD ------------------

def get_movie_image_by_id(*, session: Session, image_id: uuid.UUID) -> Optional[MovieImage]:
    statement = select(MovieImage).where(MovieImage.id == image_id)
    return session.exec(statement).first()


def create_movie_image(*, session: Session, movie_image_create: MovieImageCreate) -> MovieImage:
    db_movie_image = MovieImage.model_validate(movie_image_create)
    session.add(db_movie_image)
    session.commit()
    session.refresh(db_movie_image)
    return db_movie_image


def update_movie_image(*, session: Session, db_movie_image: MovieImage, movie_image_in: MovieImageUpdate) -> MovieImage:
    movie_image_data = movie_image_in.model_dump(exclude_unset=True)
    db_movie_image.sqlmodel_update(movie_image_data)
    session.add(db_movie_image)
    session.commit()
    session.refresh(db_movie_image)
    return db_movie_image


# ------------------ Payment CRUD ------------------

def get_payment_by_id(*, session: Session, payment_id: uuid.UUID) -> Optional[Payment]:
    statement = select(Payment).where(Payment.id == payment_id)
    return session.exec(statement).first()


def create_payment(*, session: Session, payment_create: PaymentCreate) -> Payment:
    db_payment = Payment.model_validate(payment_create)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment


def update_payment(*, session: Session, db_payment: Payment, payment_in: PaymentUpdate) -> Payment:
    payment_data = payment_in.model_dump(exclude_unset=True)
    db_payment.sqlmodel_update(payment_data)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment


# ------------------ Screen CRUD ------------------

def get_screen_by_id(*, session: Session, screen_id: uuid.UUID) -> Optional[Screen]:
    statement = select(Screen).where(Screen.id == screen_id)
    return session.exec(statement).first()


def create_screen(*, session: Session, screen_create: ScreenCreate) -> Screen:
    db_screen = Screen.model_validate(screen_create)
    session.add(db_screen)
    session.commit()
    session.refresh(db_screen)
    return db_screen


def update_screen(*, session: Session, db_screen: Screen, screen_in: ScreenUpdate) -> Screen:
    screen_data = screen_in.model_dump(exclude_unset=True)
    db_screen.sqlmodel_update(screen_data)
    session.add(db_screen)
    session.commit()
    session.refresh(db_screen)
    return db_screen


# ------------------ Seat CRUD ------------------

def get_seat_by_id(*, session: Session, seat_id: uuid.UUID) -> Optional[Seat]:
    statement = select(Seat).where(Seat.id == seat_id)
    return session.exec(statement).first()


def create_seat(*, session: Session, seat_create: SeatCreate) -> Seat:
    db_seat = Seat.model_validate(seat_create)
    session.add(db_seat)
    session.commit()
    session.refresh(db_seat)
    return db_seat


def update_seat(*, session: Session, db_seat: Seat, seat_in: SeatUpdate) -> Seat:
    seat_data = seat_in.model_dump(exclude_unset=True)
    db_seat.sqlmodel_update(seat_data)
    session.add(db_seat)
    session.commit()
    session.refresh(db_seat)
    return db_seat


# ------------------ Movie Pricing CRUD ------------------

def get_movie_pricing_by_id(*, session: Session, pricing_id: uuid.UUID) -> Optional[MoviePricing]:
    """
    Retrieves a movie pricing record by its ID.

    Args:
        session (Session): SQLAlchemy session used for database interaction.
        pricing_id (UUID): The ID of the MoviePricing record to retrieve.

    Returns:
        Optional[MoviePricing]: The MoviePricing record if found, or None.
    """
    statement = select(MoviePricing).where(MoviePricing.id == pricing_id)
    return session.exec(statement).first()
