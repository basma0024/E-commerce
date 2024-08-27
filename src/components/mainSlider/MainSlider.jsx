import React from 'react'
import img_1 from '../../assets/images/slider-image-1.jpeg'
import img_2 from '../../assets/images/slider-image-2.jpeg'
import img_3 from '../../assets/images/slider-image-3.jpeg'
import img_4 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

    var settings = {
        dots: false,
        infinite:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
      };

  return (
    <>

<div className='grid md:grid-cols-12 w-3/4 mx-auto my-6'>

    <div className='md:col-span-8  bg-green-500'>
        <Slider {...settings}>
            
        <img className='h-[400px] object-center w-full' src={img_4}/>
        <img className='h-[400px] object-cover w-full' src={img_3}/>

        </Slider>

    </div>

    <div className='md:col-span-4  bg-sky-400'>
    <img className='h-[200px] object-cover w-full' src={img_2}/>
    <img className='h-[200px] object-cover w-full' src={img_1}/>

    </div>
</div>

    </>
  )
}
