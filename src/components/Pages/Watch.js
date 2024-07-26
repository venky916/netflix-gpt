import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from '../Movies/VideoTitle';
import VideoBackground from '../Movies/VideoBackground';
import MovieList from '../Movies/MovieList';
import { useNavigate } from 'react-router-dom';
import MovieInfo from '../Movies/MovieInfo';

const Watch = () => {
  const recommendedMovies = useSelector(store => store.movies.recommendedMovies);
  const { page } = useSelector(store => store.movies?.movieInfo);
  const { original_title, overview, id } = recommendedMovies[0];
  const navigate = useNavigate();

  if (!recommendedMovies[0]) navigate('/search');

  return (
    <div className='w-screen h-screen relative'>
      <div className='w-full h-full'>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} className='h-5/6' />
        <div className='bg-black -mt-20 absolute z-10 w-full overflow-x-scroll'>
          <MovieList title={"Recommended Movies"} movies={recommendedMovies} />
        </div>
        {page && (
          <div className='fixed top-10 flex items-center justify-center z-50 backdrop-blur-sm w-full h-full'>
            <MovieInfo />
          </div>
        )}
      </div>
    </div>
  )
}

export default Watch;
