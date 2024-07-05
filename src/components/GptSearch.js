import React from 'react'
import GptSearchBar from '../components/GptSerachBar';
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
    <div className='fixed -z-10 '>
        <img className='h-screen object-cover bg-gradient-to-br from-black md:h-screen w-screen' src={BG_URL}
          alt='back'
        />
      </div>
    <div >
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
    </>
  )
}

export default GptSearch