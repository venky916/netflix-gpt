import React, { useState } from 'react'
import Header from './Header'
const Login = () => {

    const [isSignInForm,setIsSignInForm] = useState(true);

    const toggleSignInForm = ()=>{
        setIsSignInForm(!isSignInForm);
    }


  return (
    <div>
        <Header />
        <div className='absolute'>
          <img src='https://assets.nflxext.com/ffe/siteui/vlv3/335ddde7-3955-499c-b4cc-ca2eb7e1ae71/a7d20bc1-831c-4f9d-8153-11bdf7a08d23/IN-en-20240624-POP_SIGNUP_TWO_WEEKS-perspective_WEB_13cda806-d858-493e-b4aa-f2792ff965dc_large.jpg'
          alt='back'
          />
        </div>

        <form className=' w-3/12 absolute p-12 bg-black text-white m-36 mx-auto left-0 right-0 rounded-lg bg-opacity-85'>
            <h1 className='font-bold text-3xl py-4'>
                  {isSignInForm ? "Sign In" :"Sign Up"}
            </h1>
            {!isSignInForm && (<input type='text' placeholder='Full Name' className='p-4 my-2 w-full bg-gray-800'/>)}
            <input type='text' placeholder='Email Address' className='p-4 my-2 w-full bg-gray-800 ' />
            <input type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-800 " />
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            {isSignInForm ? <p className='py-6 cursor-pointer'>New to Netflix ? <span className='underline' onClick={toggleSignInForm}>SignUp</span> Now </p> : <p className='py-6 cursor-pointer'>Already Registered ? <span className='underline' onClick={toggleSignInForm}>SignIn</span> Now </p>}
        </form>

        
    </div>
  )
}

export default Login
