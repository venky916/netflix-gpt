import React from 'react'

const Footer = () => {
  return (
    <div className='absolute bottom-0 w-full mt-1'>
      <div className='h-20 text-white bg-black bg-opacity-75'>
        <h1 className='text-slate-200 text-center py-2'>LETS CONNECT</h1>
        <div className=' flex justify-center items-center'>
          <a href='https://www.linkedin.com/in/Venkatesh-Maliga' target='_blank' rel="noreferrer" className='h-10 w-10'>
            <img src='/linkedIn.png' alt='' className='h-8 w-8' />
          </a>
          <a href='https://github.com/venky916/netflix-gpt' target='_blank' rel="noreferrer" className='h-10 w-10'>
            <img src='/github.png' alt='' className='h-8 w-8 bg-slate-400' />
          </a>
          <div className='flex h-10 w-10'>
            <img src='/gmail.png' alt='' className='h-8 w-8 ' /> 
            <p className='px-2 underline'>venkateshsmsv1999@gmail.com</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer