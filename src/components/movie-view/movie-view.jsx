import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

// ✅ Same API base
const API_URL = "https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com";

export const MovieView = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not logged in.");
      return;
    }

    fetch(`${API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((movies) => {
        const found = movies.find((m) => m._id === movieId);
        if (!found) throw new Error("Movie not found.");
        setMovie(found);
      })
      .catch((err) => setError(err.message));
  }, [movieId]);

  const imageUrl =
    movie?.ImagePath
      ? movie.ImagePath.startsWith("http")
        ? movie.ImagePath
        : `${API_URL}/${movie.ImagePath.replace(/^\//, "")}`
      : null;

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>

      {error ? <div className="text-danger mb-3">{error}</div> : null}

      {!movie ? (
        !error ? <div>Loading...</div> : null
      ) : (
        <>
          {imageUrl ? (
            <div>
              <img
                src={imageUrl}
                alt={movie.Title}
                style={{ maxWidth: "300px", width: "100%", height: "auto" }}
              />
            </div>
          ) : null}

          <div style={{ marginTop: "12px" }}>
            <strong>Title: </strong>
            <span>{movie.Title}</span>
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Description: </strong>
            <span>{movie.Description}</span>
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Genre: </strong>
            <span>{movie.Genre?.Name}</span>
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Director: </strong>
            <span>{movie.Director?.Name}</span>
          </div>
        </>
      )}
    </div>
  );
};
