import React from 'react'
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';

const GptSerachBar = () => {
    const selected = useSelector(store=>store.config.lang);
  return (
      <div className='pt-[8%] flex justify-center'>
          <form className='bg-black w-1/2 grid grid-cols-12'>
              <input className="p-4 m-4 col-span-9" type='text' placeholder={lang[selected].gptSearchPlaceholder} />
              <button className='py-2 px-4 m-4 bg-red-500 text-white rounded-lg col-span-3'>{lang[selected].search}</button>
          </form>
      </div>
  )
}

export default GptSerachBar