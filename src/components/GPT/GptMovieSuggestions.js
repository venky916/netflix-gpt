import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../Movies/MovieList";
import Shimmer from "../Shimmer";

const GptMovieSuggestions = ({ loading }) => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;

  // Show Shimmer if loading is true
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg shadow-lg">
      <div className="space-y-6">
        {!movieNames ? (
          // Placeholder message when no movies are searched
          <div className="text-center py-8">
            <p className="text-2xl font-bold text-gray-400">
              Search for your favorite movies!
            </p>
            <p className="text-gray-500 mt-2">
              Enter a movie name in the search bar above to get recommendations.
            </p>
          </div>
        ) : (
          // Display movie suggestions
          movieNames.map((movie, index) => (
            <div
              key={movie}
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-500">{movie}</h2>
              <MovieList movies={movieResults[index]} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
