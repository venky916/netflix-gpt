import React, { useRef } from "react";
import lang from "../../utils/Constants/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import genAI from "../../utils/openai";
import { API_OPTIONS } from "../../utils/Constants/constants";
import { addGptMovieResult } from "../../utils/Slices/gptSlice";
import { FaSearch } from "react-icons/fa"; // For search icon

const GptSerachBar = ({ setLoading }) => {
  const selected = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return; // Don't search if input is empty

    setLoading(true); // Start loading

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query " +
      searchText.current.value +
      ". only give me names of 5 movie, comma seperated like the example result given ahead. Example Result: Don,3 idiots,Munna Bhai MBBS,Bahubali,Avengers";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const text = response.text();
    const gptMovies = text.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    setLoading(false); // Stop loading
  };

  // Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  return (
    <div className="pt-[35%] flex justify-center md:pt-[10%] pb-4">
      <form
        className="bg-black w-full md:w-1/2 grid grid-cols-12 rounded-lg overflow-hidden shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="p-2 m-4 col-span-9 bg-transparent text-white placeholder-gray-400 outline-none"
          type="text"
          placeholder={lang[selected].gptSearchPlaceholder}
          ref={searchText}
        />
        <button
          className="py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3 hover:bg-red-600 transition-colors flex items-center justify-center"
          onClick={handleGptSearchClick}
        >
          <FaSearch className="mr-2" /> {lang[selected].search}
        </button>
      </form>
    </div>
  );
};

export default GptSerachBar;
