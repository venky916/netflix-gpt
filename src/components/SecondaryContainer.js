import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store=>store.movies);
  return (
    (movies && 
    <div className='bg-black'>
        <div className=' -mt-56 pl-12 relative z-10 w-screen'>
          <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies}/>
          <MovieList title={'Popular'} movies={movies.popularMovies} />
          <MovieList title={'Trending'} movies={movies.nowPlayingMovies} />
          <MovieList title={'UpComing Movies'} movies={movies.nowPlayingMovies} />
          <MovieList title={'Horror'} movies={movies.nowPlayingMovies} />
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