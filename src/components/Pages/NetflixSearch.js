import React, { useState, useRef } from 'react'
import { API_OPTIONS, BG_URL } from '../../utils/Constants/constants'
import { useDispatch } from 'react-redux';
import { addSearchedMovies, addTrailerVideo } from '../../utils/Slices/movieSlice';
import { useNavigate } from 'react-router-dom';

const NetflixSearch = () => {
  const searchText = useRef('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuggestions = async () => {
    //api call
    const data = await fetch('https://api.themoviedb.org/3/search/keyword?query=' + searchText.current?.value + '&page=1', API_OPTIONS);
    const json = await data.json();
    // console.log(json);
    setSuggestions(json?.results);
  }
  const handleSuggestion = (event, s) => {
    // console.log(s);
    // searchText.current.value=(event.target.innerText);
    searchText.current.value = s?.name;
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    const query = searchText.current.value;
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText.current.value}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    const json = await data.json();
    console.log(json);
    dispatch(addSearchedMovies(json.results));
    const movieId = json.results[0].id;
    const data1 = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', API_OPTIONS);
    const json1 = await data1.json();
    const filterData = json1.results.filter(video => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json1.results[0];
    dispatch(addTrailerVideo(trailer));
    navigate(`/watch/${query}`);
  }
  return (
    <div>
      <div className='fixed -z-10 '>
        <img className='h-screen object-cover  md:h-screen w-screen' src={BG_URL}
          alt='back'
        />
      </div >
      <div className=' pt-[35%] flex justify-center md:pt-[10%] '>
        <form className='bg-black w-full md:w-1/2 grid grid-cols-12 ' onSubmit={(e) => e.preventDefault()}>
          <input className="p-4 m-4 col-span-9 outline-none" type='text' ref={searchText} onChange={handleSuggestions} onFocus={() => setShowSuggestions(true)} onBlur={() => setShowSuggestions(false)} placeholder='Search Movies '/>
          <button className='py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3' onClick={handleSearch}>Search</button>
        </form>
      </div>
      <div className='flex justify-center'>
        {showSuggestions && searchText.current.value!=='' &&
          <div className="absolute z-5 left-[26%] bg-black text-white py-2 px-2 w-[36%] shadow-lg rounded-lg border border-gray-50">
            <ul >
              {suggestions.map((s) => (
                <li key={s?.id} className="py-2 px-3 shadow-sm hover:bg-slate-400" onMouseDown={(e) => handleSuggestion(e, s)}>
                  🔍{s?.name}
                </li>
              ))}
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default NetflixSearch