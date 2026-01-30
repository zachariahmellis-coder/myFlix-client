import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies, user, token, onUserUpdated }) => {
  const { movieId } = useParams();

  if (!movies || movies.length === 0) return <div>Loading...</div>;

  const movie = movies.find((m) => m._id === movieId);
  if (!movie) return <div>Movie not found.</div>;

  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const handleToggleFavorite = () => {
    const method = isFavorite ? "DELETE" : "POST";

    fetch(
      `https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method,
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update favorites");
        return res.json();
      })
      .then((updatedUser) => {
        onUserUpdated(updatedUser);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <img className="w-100" src={movie.ImagePath} alt={movie.Title} />

      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>

      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>

      <div className="d-flex gap-2 mt-3">
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>

        <Link to="/">
          <Button variant="outline-secondary">Back</Button>
        </Link>
      </div>
    </div>
  );
};
