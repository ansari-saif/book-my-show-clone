import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import SessionDep
from app.models import MoviePricing, MoviePricingCreate, MoviePricingPublic, MoviePricingsPublic, MoviePricingUpdate, Message

router = APIRouter()

@router.get("/", response_model=MoviePricingsPublic)
def read_movie_pricing(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(MoviePricing)
    count = session.exec(count_statement).one()
    statement = select(MoviePricing).offset(skip).limit(limit)
    movie_pricing = session.exec(statement).all()
    return MoviePricingsPublic(data=movie_pricing, count=count)


@router.post("/", response_model=MoviePricingPublic)
def create_movie_pricing(session: SessionDep, movie_pricing_in: MoviePricingCreate) -> Any:
    movie_pricing = MoviePricing.model_validate(movie_pricing_in)
    session.add(movie_pricing)
    session.commit()
    session.refresh(movie_pricing)
    return movie_pricing

@router.put("/{id}", response_model=MoviePricingPublic)
def update_movie_pricing(session: SessionDep, id: uuid.UUID, movie_pricing_in: MoviePricingUpdate) -> Any:
    movie_pricing = session.get(MoviePricing, id)
    if not movie_pricing:
        raise HTTPException(status_code=404, detail="Movie pricing not found")
    update_dict = movie_pricing_in.model_dump(exclude_unset=True)
    movie_pricing.sqlmodel_update(update_dict)
    session.add(movie_pricing)
    session.commit()
    session.refresh(movie_pricing)
    return movie_pricing

@router.delete("/{id}")
def delete_movie_pricing(session: SessionDep, id: uuid.UUID) -> Message:
    movie_pricing = session.get(MoviePricing, id)
    if not movie_pricing:
        raise HTTPException(status_code=404, detail="Movie pricing not found")
    session.delete(movie_pricing)
    session.commit()
    return Message(message="Movie pricing deleted successfully")
