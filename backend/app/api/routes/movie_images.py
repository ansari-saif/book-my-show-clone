import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import CurrentUser, SessionDep
from app.models import MovieImage, MovieImageCreate, MovieImagePublic, MovieImagesPublic, MovieImageUpdate, Message

router = APIRouter()

@router.get("/", response_model=MovieImagesPublic)
def read_movie_images(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(MovieImage)
    count = session.exec(count_statement).one()
    statement = select(MovieImage).offset(skip).limit(limit)
    movie_images = session.exec(statement).all()
    return MovieImagesPublic(data=movie_images, count=count)

@router.get("/{id}", response_model=MovieImagePublic)
def read_movie_image(session: SessionDep, id: uuid.UUID) -> Any:
    movie_image = session.get(MovieImage, id)
    if not movie_image:
        raise HTTPException(status_code=404, detail="Movie image not found")
    return movie_image

@router.post("/", response_model=MovieImagePublic)
def create_movie_image(session: SessionDep, movie_image_in: MovieImageCreate) -> Any:
    movie_image = MovieImage.model_validate(movie_image_in)
    session.add(movie_image)
    session.commit()
    session.refresh(movie_image)
    return movie_image

@router.put("/{id}", response_model=MovieImagePublic)
def update_movie_image(session: SessionDep, id: uuid.UUID, movie_image_in: MovieImageUpdate) -> Any:
    movie_image = session.get(MovieImage, id)
    if not movie_image:
        raise HTTPException(status_code=404, detail="Movie image not found")
    update_dict = movie_image_in.model_dump(exclude_unset=True)
    movie_image.sqlmodel_update(update_dict)
    session.add(movie_image)
    session.commit()
    session.refresh(movie_image)
    return movie_image

@router.delete("/{id}")
def delete_movie_image(session: SessionDep, id: uuid.UUID) -> Message:
    movie_image = session.get(MovieImage, id)
    if not movie_image:
        raise HTTPException(status_code=404, detail="Movie image not found")
    session.delete(movie_image)
    session.commit()
    return Message(message="Movie image deleted successfully")