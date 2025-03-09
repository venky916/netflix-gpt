import React, { useState } from "react";
import GptSearchBar from "./GptSerachBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../../utils/Constants/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../../utils/Slices/gptSlice";

const GptSearch = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state

  // Clear previous results when the component mounts
  React.useEffect(() => {
    dispatch(addGptMovieResult({ movieNames: null, movieResults: null }));
  }, [dispatch]);

  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover bg-gradient-to-br from-black md:h-screen w-screen"
          src={BG_URL}
          alt="back"
        />
      </div>
      <div>
        <GptSearchBar setLoading={setLoading} />{" "}
        {/* Pass setLoading as a prop */}
        <GptMovieSuggestions loading={loading} /> {/* Pass loading as a prop */}
      </div>
    </>
  );
};

export default GptSearch;
