from datetime import datetime
from sqlmodel import Session
from app import crud
from app.models import Booking, BookingCreate
from app.tests.utils.show import create_random_show
from app.tests.utils.user import create_random_user

def create_random_booking(db: Session) -> Booking:
    user = create_random_user(db)
    show = create_random_show(db)
    booking_in = BookingCreate(
        user_id=user.id,
        show_id=show.id,
        total_amount=500.00,
        booking_time=datetime.now()
    )
    booking = crud.create_booking(session=db, booking_create=booking_in)
    return booking