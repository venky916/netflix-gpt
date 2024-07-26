import React from 'react'
import { useDispatch } from 'react-redux';
import { addMovieInfo, setMovieInfoTrailerPage } from '../../utils/Slices/movieSlice';

const VideoTitle = ({ title, overview, mainMovie }) => {
  const dispatch = useDispatch();
  const handleMovieInfoPage = () => {
    dispatch(addMovieInfo(mainMovie));
  };
  const handleMovieInfoVideo = () => {
    dispatch(addMovieInfo(mainMovie));
    dispatch(setMovieInfoTrailerPage(true));
  };
  return (
    <div className='w-screen aspect-video pt-[18%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden py-6 text-lg w-1/2 md:line-clamp-3 md:max-h-[110px]'>{overview}</p>
      <div className='my-4 md:my-10 '>
        <button className='bg-white text-black py-1 md:py-4 px-2 md:px-12 text-xl rounded-md hover:bg-opacity-80' onClick={handleMovieInfoVideo}> ▶️Play</button>
        <button className='hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-md ' onClick={handleMovieInfoPage}> ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle