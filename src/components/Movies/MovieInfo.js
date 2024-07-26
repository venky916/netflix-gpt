import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import useMovieInfoTrailerVideo from '../../hooks/useMovieInfoTrailerVideo';
import { IMG_CDN } from '../../utils/Constants/constants';
import { setMovieInfoTrailerPage, toggleMovieInfo } from '../../utils/Slices/movieSlice';

const MovieInfo = () => {
  const { info } = useSelector(store => store?.movies?.movieInfo);
  const movieInfoTrailer = useSelector(
    (store) => store.movies?.movieInfoTrailer
  );
  const movieInfoTrailerPage = useSelector(
    (store) => store.movies?.movieInfoTrailerPage
  );

  const dispatch = useDispatch();
  useMovieInfoTrailerVideo(info?.id);

  const handleMovieInfoPage = () => {
    dispatch(toggleMovieInfo());
    dispatch(setMovieInfoTrailerPage(false));
  }

  const handleMovieInfoPageVideo = () => {
    dispatch(setMovieInfoTrailerPage(false));
  }

  const handleMovieInfoVideo = () => {
    dispatch(setMovieInfoTrailerPage(true));
  }

  return (
    <div className='relative bg-black mx-auto text-white rounded-lg border border-gray-400 w-1/2 aspect-video overflow-x-hidden overflow-y-scroll no-scrollbar-custom'>
      <RxCrossCircled className='fixed top-20 right-10 text-3xl' onClick={handleMovieInfoPage} />
      {!movieInfoTrailerPage ?
        (<div className='p-4'>
          <h1 className='font-bold text-2xl my-2 mb-3' >
            ➡️{info?.title}
          </h1>
          <div className=' flex flex-row justify-start gap-4 text-base cursor-pointer'>
            <div className='flex flex-col justify-start items-center gap-2 w-full h-64'>
              <img className="w-36 h-56 rounded-lg" src={IMG_CDN + info?.poster_path} alt='movie Video' />
              <button className='text-black bg-white font-semibold px-6 cursor-pointer text-lg' onClick={handleMovieInfoVideo}>Play</button>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='opacity-60'>
                <b>Language : </b>{info?.original_language}
              </p>
              <p className='opacity-60'>
                <b>Popularity :</b> {info?.popularity} ❤️
              </p>
              <p className='opacity-60'>
                <b>Release Date :</b> {info?.release_date}
              </p>
              <p className='opacity-60'>
                <b>Total Vote :</b> {info?.vote_count} ⚡
              </p>
              <p className='opacity-60'>
                <b>Overview :</b> {info?.overview}
              </p>
            </div>
          </div>
        </div>
        ) :
        (
          <>
            <div className='absolute top-0 w-full h-full overflow-hidden flex items-center bg-black rounded-lg'>
              <iframe
                className="w-full aspect-video overflow-hidden"
                src={
                  "https://www.youtube.com/embed/" +
                  movieInfoTrailer?.key +
                  "?autoplay=1&controls=0&showinfo=0"
                }
                allow="autoplay"
                title='YT-VIDEO'
              >
              </iframe>
            </div>
            <div className='absolute top-0 w-full h-full overflow-hidden flex items-center justify-center bg-black opacity-0 hover:opacity-60'>
              <RxCrossCircled className='opacity-90 text-3xl cursor-pointer' onClick={handleMovieInfoPageVideo} />
            </div>
          </>
        )

      }

    </div>
  )
}

export default MovieInfo