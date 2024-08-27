import React from 'react'
import NavBar from '../NavBar/NavBar'
import{Outlet} from'react-router-dom'
export default function LayOut() {
  return (
    <>
    <NavBar/>
    <div className='py-20'>
    <Outlet > </Outlet>

    </div>

    
    {/* <Footer/> */}
    </>
  )
}
