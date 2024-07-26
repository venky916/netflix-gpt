import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/Constants/constants';
import { addTopRatedMovies } from '../utils/Slices/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

    const getTopRatedMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/top_rated?page=1",
                API_OPTIONS
            );
            const json = await response.json();
            dispatch(addTopRatedMovies(json.results));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        !topRatedMovies && getTopRatedMovies();
    }, [])

}

export default useTopRatedMovies;