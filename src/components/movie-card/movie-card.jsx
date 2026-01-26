// src/components/movie-card/movie-card.jsx
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card>
<Card.Img
  variant="top"
  src={movie.ImagePath}
  alt={movie.Title}
/>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>

        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string
  }).isRequired
};
