import uuid
from typing import Any
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select
from app.api.deps import CurrentUser, SessionDep
from app.models import MovieFormat, MovieFormatCreate, MovieFormatPublic, MovieFormatsPublic, MovieFormatUpdate, Message

router = APIRouter()

@router.get("/", response_model=MovieFormatsPublic)
def read_movie_formats(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    count_statement = select(func.count()).select_from(MovieFormat)
    count = session.exec(count_statement).one()
    statement = select(MovieFormat).offset(skip).limit(limit)
    movie_formats = session.exec(statement).all()
    return MovieFormatsPublic(data=movie_formats, count=count)

@router.get("/{id}", response_model=MovieFormatPublic)
def read_movie_format(session: SessionDep, id: uuid.UUID) -> Any:
    movie_format = session.get(MovieFormat, id)
    if not movie_format:
        raise HTTPException(status_code=404, detail="Movie format not found")
    return movie_format

@router.post("/", response_model=MovieFormatPublic)
def create_movie_format(session: SessionDep, movie_format_in: MovieFormatCreate) -> Any:
    movie_format = MovieFormat.model_validate(movie_format_in)
    session.add(movie_format)
    session.commit()
    session.refresh(movie_format)
    return movie_format

@router.put("/{id}", response_model=MovieFormatPublic)
def update_movie_format(session: SessionDep, id: uuid.UUID, movie_format_in: MovieFormatUpdate) -> Any:
    movie_format = session.get(MovieFormat, id)
    if not movie_format:
        raise HTTPException(status_code=404, detail="Movie format not found")
    update_dict = movie_format_in.model_dump(exclude_unset=True)
    movie_format.sqlmodel_update(update_dict)
    session.add(movie_format)
    session.commit()
    session.refresh(movie_format)
    return movie_format

@router.delete("/{id}")
def delete_movie_format(session: SessionDep, id: uuid.UUID) -> Message:
    movie_format = session.get(MovieFormat, id)
    if not movie_format:
        raise HTTPException(status_code=404, detail="Movie format not found")
    session.delete(movie_format)
    session.commit()
    return Message(message="Movie format deleted successfully")