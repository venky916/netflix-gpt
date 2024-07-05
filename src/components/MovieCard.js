import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = (props) => {
  if (!props.movie.poster_path) return null;
  return (
      <div className='w-48 pr-4 hover:scale-125'>
          <img alt='moviCard' src={IMG_CDN + props.movie.poster_path} />
    </div>
  )
}

export default MovieCard