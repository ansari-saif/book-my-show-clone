import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Message,
    Movie,
    MovieCreate,
    MoviePublic,
    MoviesPublic,
    MovieUpdate,
)

router = APIRouter()


@router.get("/", response_model=MoviesPublic)
def read_movies(
    session: SessionDep, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve movies.
    """
    count_statement = select(func.count()).select_from(Movie)
    count = session.exec(count_statement).one()
    statement = select(Movie).offset(skip).limit(limit)
    movies = session.exec(statement).all()
    return MoviesPublic(data=movies, count=count)


@router.get("/{id}", response_model=MoviePublic)
def read_movie(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get movie by ID.
    """
    movie = session.get(Movie, id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@router.post("/", response_model=MoviePublic)
def create_movie(
    *, session: SessionDep, current_user: CurrentUser, movie_in: MovieCreate
) -> Any:
    """
    Create new movie.
    """
    # Only superusers can create movies
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    movie = Movie.from_orm(movie_in)
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.put("/{id}", response_model=MoviePublic)
def update_movie(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: uuid.UUID,
    movie_in: MovieUpdate,
) -> Any:
    """
    Update a movie.
    """
    movie = session.get(Movie, id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    # Only superusers can update movies
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    update_data = movie_in.model_dump(exclude_unset=True)
    movie.sqlmodel_update(update_data)
    session.add(movie)
    session.commit()
    session.refresh(movie)
    return movie


@router.delete("/{id}", response_model=Message)
def delete_movie(
    *, session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a movie.
    """
    movie = session.get(Movie, id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    # Only superusers can delete movies
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    session.delete(movie)
    session.commit()
    return Message(message="Movie deleted successfully")
