// src/components/main-view/main-view.jsx

import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies whenever we have a valid token
  useEffect(() => {
    if (!token) return;

    fetch("https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch movies");
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error(err);
        // If token is invalid/expired, force logout
        setUser(null);
        setToken(null);
        setMovies([]);
        setSelectedMovie(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  }, [token]);

  // Called by LoginView after successful login
  const handleLoggedIn = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);

    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("token", authToken);
  };

  // Optional: if you have a logout button elsewhere, you can export/prop this,
  // but leaving it here is fine for now.
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setMovies([]);
    setSelectedMovie(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={handleLoggedIn} />
          <div className="my-3 text-center">or</div>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          {/* If you already have logout elsewhere, delete this button block.
              Otherwise, leaving it is handy while developing. */}
          <div className="mt-3">
            <button className="btn btn-outline-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </Col>
      ) : movies.length === 0 ? (
        <Col>
          <div>The list is empty!</div>
        </Col>
      ) : (
        <>
          {movies.map((movie) => (
            <Col key={movie._id} md={3} className="mb-5">
              <MovieCard movie={movie} onMovieClick={(m) => setSelectedMovie(m)} />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
