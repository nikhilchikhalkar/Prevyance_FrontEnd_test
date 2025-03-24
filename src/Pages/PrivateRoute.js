import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function PrivateRoute() {
    const isLoggedIn = localStorage.getItem("token")
    

    if (isLoggedIn) {
        return (
          <>
          <Navbar/>
        <Outlet/>
          </>
        )
    }else{
      return <Navigate to={'/login'} />
    }
 
}

export default PrivateRoute