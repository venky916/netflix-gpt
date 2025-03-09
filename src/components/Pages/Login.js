import React, { useRef, useState } from "react";
import Header from "../Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  checkValidSignInFrom,
  checkValidSignUpFrom,
} from "../../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/Slices/userSlice";
import {
  USER_AVATAR,
  BG_URL,
  GOOGLE_IMG,
} from "../../utils/Constants/constants";
import Footer from "../Footer";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordType, setPasswordType] = useState(true);
  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    if (!isSignInForm) {
      // Sign Up logic
      const message = checkValidSignUpFrom(
        fullName.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In logic
      const message = checkValidSignInFrom(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  };

  const signInWithGithub = () => {
    const githubProvider = new GithubAuthProvider();

    // Set custom parameters for GitHub OAuth
    githubProvider.setCustomParameters({
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
    });

    signInWithPopup(auth, githubProvider)
      .then((userCredential) => {
        const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  };

  return (
    <div className="bg-black/50">
      <Header />
      <div className="absolute">
        <img
          className="h-screen md:w-screen object-cover z-[-10]"
          src={BG_URL}
          alt="back"
        />
      </div>
      <form
        className="w-9/12 md:w-3/12 absolute p-12 bg-black text-white m-36 mx-auto left-0 right-0 rounded-lg bg-opacity-85 my-auto top-0 bottom-0 h-[75%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-2xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-800 rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800 rounded-md"
        />
        <div className="relative">
          <input
            ref={password}
            type={passwordType ? "password" : "text"}
            placeholder="Password"
            className="rounded-md w-full p-4 bg-gray-800 outline-none"
          />
          <span
            onClick={() => setPasswordType(!passwordType)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-200/50 cursor-pointer w-5 flex justify-center"
          >
            {passwordType ? (
              <FaEye className="w-6 h-6" />
            ) : (
              <FaEyeSlash className="w-6 h-6" />
            )}
          </span>
        </div>
        <p className="text-red-700 font-bold text-lg line-clamp-1">
          {errorMessage}
        </p>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm ? (
          <p className="py-1 my-1 cursor-pointer">
            New to Getfix?{" "}
            <span className="underline" onClick={toggleSignInForm}>
              SignUp
            </span>{" "}
            Now
          </p>
        ) : (
          <p className="py-1 my-1 cursor-pointer">
            Already Registered?{" "}
            <span className="underline" onClick={toggleSignInForm}>
              SignIn
            </span>{" "}
            Now
          </p>
        )}
        <div className="flex justify-center items-center relative bg-white w-full rounded-lg py-2 my-2 hover:border-blue-600 hover:border-2">
          <img src={GOOGLE_IMG} alt="Google Logo" className="px-1" />
          <button className="text-black px-1" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
        <div className="flex justify-center items-center relative bg-white w-full rounded-lg py-2 my-2 hover:border-blue-600 hover:border-2">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="w-6 h-6 mx-2"
          />
          <button className="text-black px-1" onClick={signInWithGithub}>
            Sign in with GitHub
          </button>
        </div>
      </form>
      <div className="h-1/6">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
