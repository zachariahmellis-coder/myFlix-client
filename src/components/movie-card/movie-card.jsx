import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      {/* If you have an image URL, use it; if not, omit Card.Img */}
      {/* <Card.Img variant="top" src={movie.ImagePath} /> */}
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="text-muted">
          {movie.Director?.Name}
        </Card.Text>
        <Button variant="link" onClick={() => onMovieClick(movie)}>
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
