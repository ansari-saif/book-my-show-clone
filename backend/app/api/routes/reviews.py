import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import Review, ReviewCreate, ReviewPublic, ReviewsPublic, ReviewUpdate, Message

router = APIRouter()

@router.get("/", response_model=ReviewsPublic)
def read_reviews(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(Review)
    count = session.exec(count_statement).one()
    statement = select(Review).offset(skip).limit(limit)
    reviews = session.exec(statement).all()
    return ReviewsPublic(data=reviews, count=count)

@router.get("/{id}", response_model=ReviewPublic)
def read_review(session: SessionDep, id: uuid.UUID) -> Any:
    print(id)
    review = session.get(Review, id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review

@router.post("/", response_model=ReviewPublic)
def create_review(session: SessionDep, review_in: ReviewCreate) -> Any:
    review = Review.model_validate(review_in)
    session.add(review)
    session.commit()
    session.refresh(review)
    return review

@router.put("/{id}", response_model=ReviewPublic)
def update_review(session: SessionDep, id: uuid.UUID, review_in: ReviewUpdate) -> Any:
    review = session.get(Review, id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    update_dict = review_in.model_dump(exclude_unset=True)
    review.sqlmodel_update(update_dict)
    session.add(review)
    session.commit()
    session.refresh(review)
    return review

@router.delete("/{id}")
def delete_review(session: SessionDep, id: uuid.UUID) -> Message:
    review = session.get(Review, id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    session.delete(review)
    session.commit()
    return Message(message="Review deleted successfully")
