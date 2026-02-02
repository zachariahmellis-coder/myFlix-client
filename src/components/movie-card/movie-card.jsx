import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

// ✅ Use one API base everywhere
const API_URL = "https://cryptic-lowlands-83913-a6a2dd7d9144.herokuapp.com";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // ✅ Build a safe image URL
  const imageUrl = movie.ImagePath
    ? movie.ImagePath.startsWith("http")
      ? movie.ImagePath
      : `${API_URL}/${movie.ImagePath.replace(/^\//, "")}`
    : null;

  return (
    <Card className="h-100">
      {imageUrl ? (
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={movie.Title}
          style={{ height: "350px", objectFit: "cover" }}
        />
      ) : null}

      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>

        <Card.Text className="text-muted mb-2">
          {movie.Director?.Name || "Unknown Director"}
        </Card.Text>

        <div className="mt-auto">
          <Button variant="link" onClick={() => navigate(`/movies/${movie._id}`)}>
            Open
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};
