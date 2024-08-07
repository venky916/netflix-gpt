import { API_OPTIONS } from '../utils/Constants/constants';
import { addTrailerVideo } from '../utils/Slices/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo);
    // console.log('movieId',movieId)

    const getMovieVideos = async () => {
        // console.log('getting movie video...');
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        const filterData = json.results.filter(video => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, [])
}

export default useMovieTrailer