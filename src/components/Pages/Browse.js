import Header from '../Header';
import useNowPlayingMovies from '../../hooks/useNowPlayingMovies';
import MainContainer from '../Movies/MainContainer';
import SecondaryContainer from '../Movies/SecondaryContainer';
import usePopularMovies from '../../hooks/usePopularMovies';
import GptSearch from '../GPT/GptSearch';
import { useSelector } from 'react-redux';
import useTopRatedMovies from '../../hooks/useTopRatedMovies';
import useUpcomingMovies from '../../hooks/useUpcomingMovies';
import MovieInfo from '../Movies/MovieInfo';

const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const { page } = useSelector(store => store.movies?.movieInfo);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {
        showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )
      }
      {page && (
        <div className='fixed top-10 flex items-center justify-center z-50 backdrop-blur-sm w-full h-full'>
          <MovieInfo />
        </div>
      )
      }
    </div>
  )
}

export default Browse