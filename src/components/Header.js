import { useEffect, useRef } from 'react'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/Slices/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/Constants/constants';
import { toggleGptSearchView } from '../utils/Slices/gptSlice';
import { changeLanguage } from '../utils/Slices/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const language = useRef('en');
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => { })
      .catch((error) => {
        // An error happened.
        navigate('/error');
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser(
            {
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    // unsubscribe when component unmounts
    return () => {
      unsubscribe();
    }
  }, [dispatch,navigate])

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    //console.log(e.target.value);
    // console.log(language.current?.value);
    dispatch(changeLanguage(language.current?.value));
  }

  const handleNavigate = () => {
    navigate('/search');
  }

  return (
    <div className="absolute px-8 py-1 md:py-2 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between items-center">
      <img className=" w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-800 text-white"
              onChange={handleLanguageChange}
              ref={language}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {" "}
                  {lang.name}{" "}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-600 text-white rounded-md"
            onClick={handleGptSearchClick}
          >
            {" "}
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <button
            className="text-white py-2 px-4 mx-4 my-2 rounded-md bg-red-800"
            onClick={handleNavigate}
          >
            GetfixSearch
          </button>
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user.photoURL}
          />
          <button className="font-bold text-white text-sm ml-1" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header