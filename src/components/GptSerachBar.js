import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch ,useSelector } from 'react-redux';
import genAI from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSerachBar = () => {

    const selected = useSelector(store=>store.config.lang);
    const serachText = useRef(null);
    const dispatch = useDispatch();

    const handleGptSearchClick = async ()=>{
        const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query " + serachText.current.value+". only give me names of 5 movie, comma seperated like the example result given ahead. Example Result: Don,3 idiots,Munna Bhai MBBS,Bahubali,Avengers   ";
        // console.log(serachText.current.value);
        // const gptResults = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: gptQuery }],
        //     model: 'gpt-3.5-turbo',
        // });
        // console.log(gptResults.choices?.[0]?.message?.content);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(gptQuery);
        const response = await result.response;
        const text = response.text();
        const gptMovies = text.split(',');
        // console.log(text,gptMovies);
        // for each movie search api of tmdb api
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        // console.log(promiseArray,tmdbResults);
        dispatch(addGptMovieResult({ movieNames: gptMovies,movieResults:tmdbResults}));
    };
    
    // search movie in TMDB
    const searchMovieTMDB = async (movie)=>{
        const data = await fetch(
            'https://api.themoviedb.org/3/search/movie?query='+
            movie+
            '&include_adult=false&language=en-US&page=1', 
            API_OPTIONS)
        const json = await data.json();
        // console.log(json)
        return json.results;
    }

  return (
      <div className='pt-[8%] flex justify-center'>
          <form className='bg-black w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
              <input className="p-4 m-4 col-span-9" type='text' placeholder={lang[selected].gptSearchPlaceholder} ref={serachText}/>
              <button className='py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3' onClick={handleGptSearchClick} >{lang[selected].search}</button>
          </form>
      </div>
  )
}

export default GptSerachBar
