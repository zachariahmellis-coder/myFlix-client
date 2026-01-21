import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img
          src={movie.ImagePath}
          alt={movie.Title}
          style={{ maxWidth: "300px", width: "100%", height: "auto" }}
        />
      </div>

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

      <button onClick={onBackClick} style={{ marginTop: "16px" }}>
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
