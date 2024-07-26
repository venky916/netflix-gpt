import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../Movies/MovieList';
import Shimmer from '../Shimmer';

const GptMovieSuggestions = () => {
  const gpt = useSelector(store => store.gpt);
  const { movieResults, movieNames } = gpt;

  return (
    <>
      {!movieNames ? (
        <Shimmer />
      ) : (
        <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
          <div>
            {movieNames.map((movie, index) => (
              <MovieList key={movie} title={movie} movies={movieResults[index]} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GptMovieSuggestions;
