import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

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

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    setMovies([]);
    setSelectedMovie(null);
    localStorage.clear();
  };

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
      {user && (
        <button onClick={onLoggedOut} style={{ marginBottom: "1rem" }}>
          Logout
        </button>
      )}

      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </div>
  );
};
