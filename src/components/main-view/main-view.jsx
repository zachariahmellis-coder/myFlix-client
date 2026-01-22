import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

if (!user) {
  return (
    <>
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
      <SignupView />
    </>
  );
}

useEffect(() => {
  if (!token) return;

  fetch("https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("movies from api:", data);
      setMovies(data);
    })
    .catch((err) => console.error(err));
}, [token]);

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
if (movies.length === 0) {
  return <div>Loading...</div>;
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
