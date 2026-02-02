import { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { API_URL } from "../../config"; // <-- adjust path if needed

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => console.log("Error fetching movies:", err));
  }, [token]);

  const onLoggedIn = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("user", JSON.stringify(nextUser));
    localStorage.setItem("token", nextToken);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    setMovies([]);
    setQuery("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const filteredMovies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;

    return movies.filter((m) => {
      const title = (m.Title || "").toLowerCase();
      const genre = (m.Genre?.Name || "").toLowerCase();
      const director = (m.Director?.Name || "").toLowerCase();
      return title.includes(q) || genre.includes(q) || director.includes(q);
    });
  }, [movies, query]);

  if (!user) return <LoginView onLoggedIn={onLoggedIn} />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Movies</h2>
        <Button variant="outline-secondary" onClick={onLoggedOut}>
          Logout
        </Button>
      </div>

      <Form className="mb-3">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies by title, genre, or director…"
          aria-label="Movie search"
        />

        <div className="d-flex justify-content-between align-items-center mt-2">
          <small className="text-muted">
            {query.trim()
              ? `Showing ${filteredMovies.length} of ${movies.length}`
              : `Showing ${movies.length} movies`}
          </small>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setQuery("")}
            disabled={!query.trim()}
          >
            Clear
          </Button>
        </div>
      </Form>

      <Row>
        {filteredMovies.map((movie) => (
          <Col md={3} key={movie._id} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
