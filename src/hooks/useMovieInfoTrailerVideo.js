import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {addMovieInfoTrailer} from '../utils/Slices/movieSlice'
import { API_OPTIONS } from "../utils/Constants/constants";

const useMovieInfoTrailerVideo = (videoId) => {
    const dispatch = useDispatch();
    const getVideo = async () => {
        try {
            const response = await fetch(
                "https://api.themoviedb.org/3/movie/" +
                videoId +
                "/videos?language=en-US",
                API_OPTIONS
            );
            const data = await response.json();
            const filterData = data.results?.filter(
                (data) => data.type === "Trailer"
            );
            const trailer = filterData.length ? filterData[0] : data.results[0];
            dispatch(addMovieInfoTrailer(trailer));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVideo();
    }, []);
};
export default useMovieInfoTrailerVideo;