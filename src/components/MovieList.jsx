import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 md:px-10 py-3">
      <h2 className="text-2xl md:text-3xl py-4 text-white">{title}</h2>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

// {movies &&
// <MovieCard posterPath={movies[0].poster_path} />
// }
