import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const movies = useSelector(store =>store.movies?.nowPlayingMovies);
  if (!movies) return(
    <div className='bg-black text-white h-screen text-4xl font-bold flex flex-col justify-center items-center p-4'>
      <div className='loading-wave'>
        <div className='loading-bar bg-red-400'></div>
        <div className='loading-bar bg-red-600'></div>
        <div className='loading-bar bg-red-800'></div>
        <div className='loading-bar bg-red-950'></div>
        <div className='loading-bar bg-slate-800'></div>
      </div>
      <h2 className='text-center'>Please try it using VPN...😊</h2>
    </div>
  );

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