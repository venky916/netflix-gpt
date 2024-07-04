import React from 'react'
import GptSearchBar from '../components/GptSerachBar';
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='absolute -z-10'>
        <img className='bg-gradient-to-br from-black' src={BG_URL}
          alt='back'
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch