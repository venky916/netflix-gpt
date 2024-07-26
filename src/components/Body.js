import React from 'react'
import Login from './Pages/Login'
import Browse from './Pages/Browse'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import NetflixSearch from './Pages/NetflixSearch'
import Watch from './Pages/Watch';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:'/',
            element:<Login/>
        },
        {
            path : '/browse',
            element : <Browse />
        },
        {
            path :'/search',
            element:<NetflixSearch />
        },
        {
            path :'/watch/:query',
            element :<Watch />
        }
    ])

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body