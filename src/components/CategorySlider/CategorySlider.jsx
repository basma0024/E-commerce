import React, { useEffect, useState } from 'react'
// import style from './categorySlider.module.css'
import Slider from "react-slick";
import axios from 'axios';


export default function CategorySlider() {

  var settings = {
    dots: false,
    infinite:true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    pauseOnDotsHover: true,
  };

 

  const [categories, setCategories] = useState([]);
  function getCategories(){
  
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      setCategories(data.data);
      
    })
    .catch((error) =>{
      console.log(error);
    })
    
  }

  useEffect(() => {
    getCategories();
  }, [])
  
  return (
    <>
    <Slider {...settings} className=' overflow-hidden' >
          {categories.map((category)=> <div>
            <img src={category.image} alt={category.name} className='h-52  mt-14 w-full'/>
            <h2 className='text-center'>{category.name}</h2>
          </div>)}      
    </Slider>
    
    </>
  )
}