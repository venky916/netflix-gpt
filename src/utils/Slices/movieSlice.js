import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice(
    {
        name: "movies",
        initialState: {
            nowPlayingMovies: null,
            trailerVideo: null,
            popularMovies: null,
            topRatedMovies : null,
            upcomingMovies :null,
            recommendedMovies: null,
            movieInfo: { info: null, page: false },
            movieInfoTrailer: null,
            movieInfoTrailerPage: false,
        },
        reducers: {
            addNowPlayingMovies: (state, action) => {
                state.nowPlayingMovies = action.payload;
            },
            addTrailerVideo: (state, action) => {
                state.trailerVideo = action.payload;
            },
            addPopularMovies: (state, action) => {
                state.popularMovies = action.payload;
            },
            addTopRatedMovies :(state,action)=>{
                state.topRatedMovies = action.payload;
            },
            addUpcomingMovies:(state,action)=>{
                state.upcomingMovies=action.payload;
            },
            addSearchedMovies: (state, action) => {
                state.recommendedMovies = action.payload;
            },
            addMovieInfo: (state, action) => {
                state.movieInfo.info = action.payload;
                state.movieInfo.page = true;
            },
            toggleMovieInfo: (state, action) => {
                state.movieInfo.page = false;
                state.movieInfo.info = null;
            },
            addMovieInfoTrailer: (state, action) => {
                state.movieInfoTrailer = action.payload;
            },
            setMovieInfoTrailerPage: (state, action) => {
                state.movieInfoTrailerPage = action.payload;
            },
        }
    }
)


export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addUpcomingMovies, addTopRatedMovies,addSearchedMovies, addMovieInfo, toggleMovieInfo, addMovieInfoTrailer, setMovieInfoTrailerPage } = movieSlice.actions;
export default movieSlice.reducer;