import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const movies = useSelector(store =>store.movies?.nowPlayingMovies);
  if (!movies) return;
    // console.log(movies);
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className='pt-[35%] bg-black md:pt-0'>
      <VideoTitle title={original_title} overview={overview} mainMovie={mainMovie}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer