from sqlmodel import Session
from app import crud
from app.models import BookingDetail, BookingDetailCreate
from app.tests.utils.booking import create_random_booking
from app.tests.utils.seat import create_random_seat

def create_random_booking_detail(db: Session) -> BookingDetail:
    booking = create_random_booking(db)
    seat = create_random_seat(db)
    booking_detail_in = BookingDetailCreate(
        booking_id=booking.id,
        seat_id=seat.id,
        price=100.00  # Example price
    )
    booking_detail = crud.create_booking_detail(session=db, detail_create=booking_detail_in)
    return booking_detail

