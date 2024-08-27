import React from 'react'
// import style from './home.module.css'
// import { Link } from 'react-router-dom'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../mainSlider/MainSlider'
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
    <Helmet>
        <title>E-commerce</title>
      </Helmet>
    <MainSlider></MainSlider>
    <CategorySlider></CategorySlider>
   <RecentProducts></RecentProducts>
    
    
    </>
  )
}
