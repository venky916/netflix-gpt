import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    (movies &&
      <div className='bg-black'>
        <div className='mt-0 md:-mt-56 pl-4 md:pl-12 relative z-10 w-screen'>
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
          <MovieList title={'Popular'} movies={movies.popularMovies} />
          <MovieList title={'Trending'} movies={movies.topRatedMovies} />
          <MovieList title={'UpComing Movies'} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  )
}

export default SecondaryContainer

/* 
MovieList -Popular
  - MovieCard *n 
MovieList - Trending
MovieList - NowPlaying
MoviList -Horror
*/