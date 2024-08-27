import React from 'react'
import style from './layOut.module.css'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
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
