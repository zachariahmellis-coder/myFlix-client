import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  // Mock data (shape is similar to what your API will return)
  const [movies] = useState([
    {
      _id: "1",
      Title: "Heat",
      Description: "A master thief and a relentless detective collide in LA.",
      ImagePath: "https://via.placeholder.com/300x450?text=Heat",
      Genre: {
        Name: "Crime",
        Description: "Crime films centered on criminals and investigators."
      },
      Director: {
        Name: "Michael Mann",
        Bio: "American film director, producer, and screenwriter."
      }
    },
    {
      _id: "2",
      Title: "Sicario",
      Description: "An FBI agent is pulled into a covert war on the border.",
      ImagePath: "https://via.placeholder.com/300x450?text=Sicario",
      Genre: {
        Name: "Thriller",
        Description: "Suspenseful films driven by tension and uncertainty."
      },
      Director: {
        Name: "Denis Villeneuve",
        Bio: "Canadian director known for intense, atmospheric films."
      }
    },
    {
      _id: "3",
      Title: "John Wick",
      Description: "A retired hitman returns to the underworld for revenge.",
      ImagePath: "https://via.placeholder.com/300x450?text=John+Wick",
      Genre: {
        Name: "Action",
        Description: "Action-heavy films featuring stunts and combat."
      },
      Director: {
        Name: "Chad Stahelski",
        Bio: "American director and former stuntman."
      }
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  // If a movie is selected, show the MovieView
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  // If no movies exist (edge case)
  if (!movies || movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Otherwise show the list of MovieCards
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  );
};
