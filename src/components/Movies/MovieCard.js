import { IMG_CDN } from '../../utils/Constants/constants'
import { useDispatch } from "react-redux";
import { addMovieInfo } from '../../utils/Slices/movieSlice';

const MovieCard = (props) => {
  const dispatch = useDispatch();

  const handleMovieInfo = (movie) => {
    dispatch(addMovieInfo(movie));
    const scrollY =
      document.documentElement.style.getPropertyValue("--scroll-y");
    const body = document.body;
    body.style.position = "fixed";
    body.style.width = "100vw";
    body.style.top = `-${scrollY}`;
  }

  if (!props.movie.poster_path) return null;

  return (
    <div className='w-36 gap-2 md:w-48 pr-4 md:rounded-md hover:-translate-y-2 hover:scale-90 transition-all' key={props.movie.id}>
      <img alt='moviCard' src={IMG_CDN + props.movie.poster_path} onClick={() => handleMovieInfo(props.movie)} />
      <p className="text-gray-300 font-semibold text-xs md:text-sm line-clamp-1 w-32 sm:w-40 md:w-48">
        {props.movie.title}
      </p>
      <p className="text-gray-300 font-light text-xs md:text-sm">
        {props.movie.release_date}
      </p>
    </div>
  )
}

export default MovieCard