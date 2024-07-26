import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/Constants/constants';
import { addUpcomingMovies } from '../utils/Slices/movieSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/upcoming?page=1",
                API_OPTIONS
            );
            const json = await response.json();
            dispatch(addUpcomingMovies(json.results));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
    }, [])

}

export default useUpcomingMovies