import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import EmailStr
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlmodel import Field, Relationship, SQLModel


# ------------------ User Models ------------------
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: Optional[str] = Field(default=None, max_length=255)
    mobile: Optional[str] = Field(default=None, max_length=255)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserUpdate(UserBase):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    password: Optional[str] = Field(default=None, min_length=8, max_length=40)


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    bookings: List["Booking"] = Relationship(back_populates="user")
    reviews: List["Review"] = Relationship(back_populates="user")


class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: List[UserPublic]
    count: int


# ------------------ Movie Models ------------------
class MovieBase(SQLModel):
    title: str
    genre: str
    duration: int  # in minutes
    description: Optional[str] = None
    release_date: Optional[datetime] = None
    rating: Optional[float] = None
    is_recommended: bool = Field(default=False)
    you_might_also_like: Optional[List[uuid.UUID]] = Field(
        default=None, sa_column=Column(ARRAY(UUID), nullable=True)
    )


class MovieCreate(MovieBase):
    pass


class MovieUpdate(SQLModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    duration: Optional[int] = None
    description: Optional[str] = None
    release_date: Optional[datetime] = None
    rating: Optional[float] = None
    is_recommended: Optional[bool] = None
    you_might_also_like: Optional[List[uuid.UUID]] = None


class Movie(MovieBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    formats: List["MovieFormat"] = Relationship(back_populates="movie")
    reviews: List["Review"] = Relationship(back_populates="movie")
    pricing: List["MoviePricing"] = Relationship(back_populates="movie")
    crew: List["Crew"] = Relationship(back_populates="movie")
    cast: List["Cast"] = Relationship(back_populates="movie")
    images: List["MovieImage"] = Relationship(back_populates="movie")
    shows: List["Show"] = Relationship(back_populates="movie")


class MoviePublic(MovieBase):
    id: uuid.UUID


class MoviesPublic(SQLModel):
    data: List[MoviePublic]
    count: int


# ------------------ Movie Format Models ------------------
class MovieFormatBase(SQLModel):
    format: str  # 2D, 3D, 4DX, etc.
    language: str  # English, Hindi, etc.


class MovieFormatCreate(MovieFormatBase):
    movie_id: uuid.UUID


class MovieFormatUpdate(SQLModel):
    format: Optional[str] = None
    language: Optional[str] = None


class MovieFormat(MovieFormatBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    movie: "Movie" = Relationship(back_populates="formats")
    movie_pricings: List["MoviePricing"] = Relationship(back_populates="movie_format")


class MovieFormatPublic(MovieFormatBase):
    id: uuid.UUID
    movie_id: uuid.UUID


class MovieFormatsPublic(SQLModel):
    data: List[MovieFormatPublic]
    count: int


# ------------------ Movie Image Models ------------------
class MovieImageBase(SQLModel):
    image_url: str = Field(max_length=500)
    image_type: str = Field(max_length=50)  # poster, banner, thumbnail, etc.


class MovieImageCreate(MovieImageBase):
    movie_id: uuid.UUID


class MovieImageUpdate(SQLModel):
    image_url: Optional[str] = None
    image_type: Optional[str] = None


class MovieImage(MovieImageBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    movie: "Movie" = Relationship(back_populates="images")


class MovieImagePublic(MovieImageBase):
    id: uuid.UUID
    movie_id: uuid.UUID


class MovieImagesPublic(SQLModel):
    data: List[MovieImagePublic]
    count: int


# ------------------ HomePageData Models ------------------
class HomePageDataBase(SQLModel):
    section_name: str = Field(max_length=100)  # e.g. Top Movies, Trending, Recommended
    movie_ids: List[uuid.UUID] = Field(sa_column=Column(ARRAY(UUID)))  # List of movie IDs


class HomePageDataCreate(HomePageDataBase):
    pass


class HomePageDataUpdate(SQLModel):
    section_name: Optional[str] = None
    movie_ids: Optional[List[uuid.UUID]] = None


class HomePageData(HomePageDataBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)


class HomePageDataPublic(HomePageDataBase):
    id: uuid.UUID


class HomePageDatasPublic(SQLModel):
    data: List[HomePageDataPublic]
    count: int


# ------------------ City Models ------------------
class CityBase(SQLModel):
    city_name: str = Field(max_length=100)
    state: Optional[str] = Field(max_length=100)
    country: Optional[str] = Field(max_length=100)


class CityCreate(CityBase):
    pass


class CityUpdate(SQLModel):
    city_name: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None


class City(CityBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    cinemas: List["Cinema"] = Relationship(back_populates="city")


class CityPublic(CityBase):
    id: uuid.UUID


class CitiesPublic(SQLModel):
    data: List[CityPublic]
    count: int


# ------------------ Cinema Models ------------------
class CinemaBase(SQLModel):
    name: str
    address: str
    phone_number: Optional[str] = None


class CinemaCreate(CinemaBase):
    city_id: uuid.UUID  # city_id is now a required field


class CinemaUpdate(SQLModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone_number: Optional[str] = None


class Cinema(CinemaBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    city_id: uuid.UUID = Field(foreign_key="city.id")
    city: "City" = Relationship(back_populates="cinemas")
    screens: List["Screen"] = Relationship(back_populates="cinema")
    movie_pricing: List["MoviePricing"] = Relationship(back_populates="cinema")


class CinemaPublic(CinemaBase):
    id: uuid.UUID
    city_id: uuid.UUID


class CinemasPublic(SQLModel):
    data: List[CinemaPublic]
    count: int


# ------------------ Cinema Category Models ------------------
class CinemaCategoryBase(SQLModel):
    category_name: str = Field(max_length=100)  # VIP, Regular, IMAX, etc.


class CinemaCategoryCreate(CinemaCategoryBase):
    pass


class CinemaCategoryUpdate(SQLModel):
    category_name: Optional[str] = None


class CinemaCategory(CinemaCategoryBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_pricing: List["MoviePricing"] = Relationship(back_populates="category")


class CinemaCategoryPublic(CinemaCategoryBase):
    id: uuid.UUID


class CinemaCategoriesPublic(SQLModel):
    data: List[CinemaCategoryPublic]
    count: int


# ------------------ Screen Models ------------------
class ScreenBase(SQLModel):
    screen_name: str
    capacity: int


class ScreenCreate(ScreenBase):
    cinema_id: uuid.UUID


class ScreenUpdate(SQLModel):
    screen_name: Optional[str] = None
    capacity: Optional[int] = None


class Screen(ScreenBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    cinema_id: uuid.UUID = Field(foreign_key="cinema.id")
    cinema: "Cinema" = Relationship(back_populates="screens")
    seats: List["Seat"] = Relationship(back_populates="screen")
    shows: List["Show"] = Relationship(back_populates="screen")


class ScreenPublic(ScreenBase):
    id: uuid.UUID
    cinema_id: uuid.UUID


class ScreensPublic(SQLModel):
    data: List[ScreenPublic]
    count: int


# ------------------ Seat Models ------------------
class SeatBase(SQLModel):
    seat_number: str
    seat_type: str  # Regular, VIP, etc.
    is_available: bool = Field(default=True)


class SeatCreate(SeatBase):
    screen_id: uuid.UUID


class SeatUpdate(SQLModel):
    seat_number: Optional[str] = None
    seat_type: Optional[str] = None
    is_available: Optional[bool] = None


class Seat(SeatBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    screen_id: uuid.UUID = Field(foreign_key="screen.id")
    screen: "Screen" = Relationship(back_populates="seats")
    bookingdetails: List["BookingDetail"] = Relationship(back_populates="seat")


class SeatPublic(SeatBase):
    id: uuid.UUID
    screen_id: uuid.UUID


class SeatsPublic(SQLModel):
    data: List[SeatPublic]
    count: int


# ------------------ Show Models ------------------
class ShowBase(SQLModel):
    show_time: datetime


class ShowCreate(ShowBase):
    movie_id: uuid.UUID
    screen_id: uuid.UUID


class ShowUpdate(SQLModel):
    show_time: Optional[datetime] = None
    movie_id: Optional[uuid.UUID] = None
    screen_id: Optional[uuid.UUID] = None


class Show(ShowBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    screen_id: uuid.UUID = Field(foreign_key="screen.id")
    movie: "Movie" = Relationship(back_populates="shows")
    screen: "Screen" = Relationship(back_populates="shows")
    bookings: List["Booking"] = Relationship(back_populates="show")


class ShowPublic(ShowBase):
    id: uuid.UUID
    movie_id: uuid.UUID
    screen_id: uuid.UUID


class ShowsPublic(SQLModel):
    data: List[ShowPublic]
    count: int


# ------------------ Review Models ------------------
class ReviewBase(SQLModel):
    rating: int
    review_text: Optional[str] = None
    is_top_review: bool = Field(default=False)


class ReviewCreate(ReviewBase):
    user_id: uuid.UUID
    movie_id: uuid.UUID


class ReviewUpdate(SQLModel):
    rating: Optional[int] = None
    review_text: Optional[str] = None
    is_top_review: Optional[bool] = None


class Review(ReviewBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    user: "User" = Relationship(back_populates="reviews")
    movie: "Movie" = Relationship(back_populates="reviews")


class ReviewPublic(ReviewBase):
    id: uuid.UUID
    user_id: uuid.UUID
    movie_id: uuid.UUID


class ReviewsPublic(SQLModel):
    data: List[ReviewPublic]
    count: int
    movie_id: uuid.UUID


# ------------------ Booking Models ------------------
class BookingBase(SQLModel):
    booking_time: datetime
    total_amount: float


class BookingCreate(BookingBase):
    user_id: uuid.UUID
    show_id: uuid.UUID


class BookingUpdate(SQLModel):
    booking_time: Optional[datetime] = None
    total_amount: Optional[float] = None
    user_id: Optional[uuid.UUID] = None
    show_id: Optional[uuid.UUID] = None


class Booking(BookingBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    show_id: uuid.UUID = Field(foreign_key="show.id")
    user: "User" = Relationship(back_populates="bookings")
    show: "Show" = Relationship(back_populates="bookings")
    details: List["BookingDetail"] = Relationship(back_populates="booking")
    payments: List["Payment"] = Relationship(back_populates="booking")


class BookingPublic(BookingBase):
    id: uuid.UUID
    user_id: uuid.UUID
    show_id: uuid.UUID


class BookingsPublic(SQLModel):
    data: List[BookingPublic]
    count: int


# ------------------ Booking Detail Models ------------------
class BookingDetailBase(SQLModel):
    price: float


class BookingDetailCreate(BookingDetailBase):
    booking_id: uuid.UUID
    seat_id: uuid.UUID


class BookingDetailUpdate(SQLModel):
    price: Optional[float] = None
    booking_id: Optional[uuid.UUID] = None
    seat_id: Optional[uuid.UUID] = None


class BookingDetail(BookingDetailBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    booking_id: uuid.UUID = Field(foreign_key="booking.id")
    seat_id: uuid.UUID = Field(foreign_key="seat.id")
    booking: "Booking" = Relationship(back_populates="details")
    seat: "Seat" = Relationship(back_populates="bookingdetails")


class BookingDetailPublic(BookingDetailBase):
    id: uuid.UUID
    booking_id: uuid.UUID
    seat_id: uuid.UUID


class BookingDetailsPublic(SQLModel):
    data: List[BookingDetailPublic]
    count: int


# ------------------ Payment Models ------------------
class PaymentBase(SQLModel):
    payment_method: str
    payment_status: str
    amount_paid: float


class PaymentCreate(PaymentBase):
    booking_id: uuid.UUID


class PaymentUpdate(SQLModel):
    payment_method: Optional[str] = None
    payment_status: Optional[str] = None
    amount_paid: Optional[float] = None


class Payment(PaymentBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    booking_id: uuid.UUID = Field(foreign_key="booking.id")
    booking: "Booking" = Relationship(back_populates="payments")


class PaymentPublic(PaymentBase):
    id: uuid.UUID
    booking_id: uuid.UUID


class PaymentsPublic(SQLModel):
    data: List[PaymentPublic]
    count: int


# ------------------ Movie Pricing Models ------------------
class MoviePricingBase(SQLModel):
    price: float


class MoviePricingCreate(MoviePricingBase):
    movie_id: uuid.UUID
    cinema_id: uuid.UUID
    format_id: uuid.UUID


class MoviePricingUpdate(SQLModel):
    price: Optional[float] = None
    movie_id: Optional[uuid.UUID] = None
    cinema_id: Optional[uuid.UUID] = None
    category_id: Optional[uuid.UUID] = None
    format_id: Optional[uuid.UUID] = None


class MoviePricing(MoviePricingBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    movie: "Movie" = Relationship(back_populates="pricing")
    cinema_id: uuid.UUID = Field(foreign_key="cinema.id")
    cinema: "Cinema" = Relationship(back_populates="movie_pricing")
    category_id: Optional[uuid.UUID] = Field(default=None,foreign_key="cinemacategory.id", nullable=True)
    category: "CinemaCategory" = Relationship(back_populates="movie_pricing")
    format_id: uuid.UUID = Field(foreign_key="movieformat.id")
    movie_format: "MovieFormat" = Relationship(back_populates="movie_pricings")


class MoviePricingPublic(MoviePricingBase):
    id: uuid.UUID
    movie_id: uuid.UUID
    cinema_id: uuid.UUID
    category_id: uuid.UUID
    format_id: uuid.UUID


class MoviePricingsPublic(SQLModel):
    data: List[MoviePricingPublic]
    count: int


# ------------------ Crew Models ------------------
class CrewBase(SQLModel):
    name: str
    role: str  # Director, Producer, etc.


class CrewCreate(CrewBase):
    movie_id: uuid.UUID


class CrewUpdate(SQLModel):
    name: Optional[str] = None
    role: Optional[str] = None


class Crew(CrewBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    movie: "Movie" = Relationship(back_populates="crew")


class CrewPublic(CrewBase):
    id: uuid.UUID
    movie_id: uuid.UUID


class CrewsPublic(SQLModel):
    data: List[CrewPublic]
    count: int


# ------------------ Cast Models ------------------
class CastBase(SQLModel):
    name: str
    role_in_movie: str  # Character name


class CastCreate(CastBase):
    movie_id: uuid.UUID


class CastUpdate(SQLModel):
    name: Optional[str] = None
    role_in_movie: Optional[str] = None


class Cast(CastBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    movie_id: uuid.UUID = Field(foreign_key="movie.id")
    movie: "Movie" = Relationship(back_populates="cast")


class CastPublic(CastBase):
    id: uuid.UUID
    movie_id: uuid.UUID


class CastsPublic(SQLModel):
    data: List[CastPublic]
    count: int


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


# Generic message
class Message(SQLModel):
    message: str


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID



class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)


class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)
