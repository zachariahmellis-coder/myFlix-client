import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // =========================
  // FETCH MOVIES (JWT)
  // =========================
  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    fetch("https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("MOVIES RESPONSE 👉", data);
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load movies:", err);
        setMovies([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  // =========================
  // LOGOUT
  // =========================
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    setMovies([]);
    setSelectedMovie(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // =========================
  // AUTH SCREENS
  // =========================
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

  // =========================
  // MOVIE DETAIL VIEW
  // =========================
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // =========================
  // LOADING / EMPTY STATES
  // =========================
  if (isLoading) {
    return (
      <div>
        <button onClick={onLoggedOut} style={{ marginBottom: "1rem" }}>
          Logout
        </button>
        <div>Loading...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div>
        <button onClick={onLoggedOut} style={{ marginBottom: "1rem" }}>
          Logout
        </button>
        <div>No movies found.</div>
      </div>
    );
  }

  // =========================
  // MOVIE LIST
  // =========================
  return (
    <div>
      <button onClick={onLoggedOut} style={{ marginBottom: "1rem" }}>
        Logout
      </button>

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
