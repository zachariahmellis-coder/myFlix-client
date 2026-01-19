export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      style={{
        cursor: "pointer",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255,255,255,0.15)"
      }}
    >
      {movie.Title}
    </div>
  );
};
