import React from "react";
import { Link } from "@tanstack/react-router"


interface PosterProps {
  id: string;
  poster_path: string;
  original_title: string;
  isDark?: boolean;
}

const Poster: React.FC<PosterProps> = ({ id, poster_path, original_title, isDark = false }) => {
  const moviePath = `/movie/${id}`
  return (
    <Link to={moviePath}>
      <div className="flex flex-col items-start gap-2 px-1 md:px-3">
        <div className="h-40 md:h-80">
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt="poster"
            className="w-full h-full rounded-md"
          />
        </div>
        <h3
          className={`text-lg font-bold ${isDark ? "text-white" : "text-black"}`}
        >
          {original_title}
        </h3>
      </div>
    </Link>
  );
};

export default Poster;
