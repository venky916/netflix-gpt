import React, { useState, useRef } from "react";
import { API_OPTIONS, BG_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import {
  addSearchedMovies,
  addTrailerVideo,
} from "../../utils/Slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // For the back arrow icon

const GetfixSearch = () => {
  const searchText = useRef("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuggestions = async () => {
    const query = searchText.current?.value;
    if (!query) {
      setSuggestions([]);
      return;
    }

    const data = await fetch(
      `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    setSuggestions(json?.results || []);
  };

  const handleSuggestionClick = (event, suggestion) => {
    searchText.current.value = suggestion?.name;
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    const query = searchText.current.value;
    if (!query) return;

    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addSearchedMovies(json.results));

    if (json.results.length > 0) {
      const movieId = json.results[0].id;
      const data1 = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json1 = await data1.json();
      const filterData = json1.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json1.results[0];
      dispatch(addTrailerVideo(trailer));
      navigate(`/watch/${query}`);
    }
  };

  const handleBack = () => {
    navigate("/browse"); // Navigate back to the previous page
  };

  return (
    <div>
      {/* Background Image */}
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover w-screen"
          src={BG_URL}
          alt="background"
        />
      </div>

      {/* Back Arrow */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="text-red-500 text-2xl hover:text-white transition-colors"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Search Bar */}
      <div className="pt-[35%] flex justify-center md:pt-[10%] mx-4">
        <form
          className="bg-black w-full md:w-1/2 grid grid-cols-12 rounded-lg overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="p-2 m-4 col-span-9 outline-none bg-transparent text-white placeholder-gray-400"
            type="text"
            ref={searchText}
            onChange={handleSuggestions}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding to allow clicks
            placeholder="Search Movies"
          />
          <button
            className="py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3 hover:bg-red-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>

      {/* Suggestions Box */}
      {showSuggestions && searchText.current.value !== "" && (
        <div className="absolute z-10 left-5 md:left-[26%] bg-black text-white py-2  w-[80%] md:w-[36%] shadow-lg rounded-lg border border-gray-700 mt-2">
          <ul>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <li
                  key={suggestion?.id}
                  className="py-2 px-3 shadow-sm hover:bg-gray-800 cursor-pointer"
                  onMouseDown={(e) => handleSuggestionClick(e, suggestion)}
                >
                  🔍 {suggestion?.name}
                </li>
              ))
            ) : (
              <li className="py-2 px-3 text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetfixSearch;
