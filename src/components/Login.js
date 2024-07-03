import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const name= useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = ()=>{
        // validate form data
        const message =checkValidData(email.current.value,password.current.value)
        setErrorMessage(message);

        if(message) return;

        // signIn/signUp
        if(!isSignInForm){
            //signUp logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://wallpapers.com/images/featured/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
                    }).then(() => { 
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser(
                                {
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL
                                }));
                        navigate('/browse');
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode+"-"+errorMessage);
                });
        }
        else{
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    navigate('/browse');
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });

        }
    }

  return (
    <div>
        <Header />
        <div className='absolute'>
          <img className='bg-black' src='https://assets.nflxext.com/ffe/siteui/vlv3/335ddde7-3955-499c-b4cc-ca2eb7e1ae71/a7d20bc1-831c-4f9d-8153-11bdf7a08d23/IN-en-20240624-POP_SIGNUP_TWO_WEEKS-perspective_WEB_13cda806-d858-493e-b4aa-f2792ff965dc_large.jpg'
          alt='back'
          />
        </div>
        <form className=' w-3/12 absolute p-12 bg-black text-white m-36 mx-auto left-0 right-0 rounded-lg bg-opacity-85' onSubmit={(e)=>e.preventDefault()}>
            <h1 className='font-bold text-3xl py-4'>
                  {isSignInForm ? "Sign In" :"Sign Up"}
            </h1>
            {!isSignInForm && (<input ref={name} type='text' placeholder='Full Name' className='p-4 my-2 w-full bg-gray-800'/>)}
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-2 w-full bg-gray-800 ' />
            <input  ref={password} type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-800 " />
            <p className='text-red-700 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            {isSignInForm ? <p className='py-6 cursor-pointer'>New to Netflix ? <span className='underline' onClick={toggleSignInForm}>SignUp</span> Now </p> : <p className='py-6 cursor-pointer'>Already Registered ? <span className='underline' onClick={toggleSignInForm}>SignIn</span> Now </p>}
        </form>
    </div>
  )
}

export default Login
