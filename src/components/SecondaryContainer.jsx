import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
      <div className="bg-black">
        <div className="mt-0 md:-mt-20 lg:-mt-72 p-4 md:p-0 relative z-20">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MovieList title="Top Rated" movies={movies.topRatedMovies} />
          <MovieList title="Popular" movies={movies.popularMovies} />
          <MovieList title="Upcoming" movies={movies.upcomingMovies} />
        </div>
      </div>
  );
};

export default SecondaryContainer;
