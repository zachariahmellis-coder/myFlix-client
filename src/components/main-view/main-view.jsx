import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // If no movies exist (edge case)
  if (!movies || movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Otherwise show the list of MovieCards
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};
