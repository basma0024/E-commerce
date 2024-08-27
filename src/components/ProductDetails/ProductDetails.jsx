import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { cartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wishContext } from '../../context/WishlistContext';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  const { id, category } = useParams();
  const { addToCart ,setCart} = useContext(cartContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState({});
  const { addToWishlist } = useContext(wishContext);


  var settings = {
    dots: true,
    infinite:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem('wishlistStatus')) || {};
    setWishlistStatus(storedStatus);
  }, []);



  function wished(productId) {
    const isWished = wishlistStatus[productId];
    const updatedStatus = { ...wishlistStatus, [productId]: !isWished };

    setWishlistStatus(updatedStatus);
    localStorage.setItem('wishlistStatus', JSON.stringify(updatedStatus));

    setWishlistLoading(prev => ({ ...prev, [productId]: true })); 

    addToWishlist(productId, !isWished)
      .then(response => {
        if (response.data.status === 'success') {
          toast.success(response.data.message, {
            duration: 2000,
            position: "top-right",
            style: {
              backgroundColor: 'green',
              color: 'white',
              padding: '25px'
            }
          });
        } else {
          toast.error(response.data.message, {
            duration: 2000,
            position: "top-right",
            style: {
              backgroundColor: 'red',
              color: 'white',
              padding: '25px'
            }
          });
        }
      })
      .catch(() => {
        toast.error('An error occurred. Please try again.', {
          duration: 2000,
          position: "top-right",
          style: {
            backgroundColor: 'red',
            color: 'white',
            padding: '25px'
          }
        });
      })
      .finally(() => {
        setWishlistLoading(prev => ({ ...prev, [productId]: false }));
      });
  }



  const { data: productData, isLoading, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(res => res.data.data),
    enabled: !!id 
  });



  useEffect(() => {
    if (category) {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({ data }) => {
          const allProducts = data.data;
          const related = allProducts.filter(product => product.category.name === category);
          setRelatedProducts(related);
        })
        .catch(() => {
          toast.error('Failed to load related products');
        });
    }
  }, [category]);



  async function addProduct(productId) {
    setLoadingProductId(productId);
    try {
      let response = await addToCart(productId);
      if (response.data.status === 'success') {
        setCart(response?.data)

        toast.success(response.data.message, {
          duration: 2000,
          position: "top-right",
          style: {
            backgroundColor: 'green',
            color: 'white',
            padding: '25px'
          }
        });
      } else {
        toast.error(response.data.message, {
          duration: 2000,
          position: "top-right",
          style: {
            backgroundColor: 'red',
            color: 'white',
            padding: '25px'
          }
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: 'red',
          color: 'white',
          padding: '25px'
        }
      });
    } finally {
      setLoadingProductId(null); 
    }
  }



  if (isLoading) return (
    <div className="overlay">
      <div className="lds-ring text-green-600">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );





  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>productDetails</title>
      </Helmet>
      <div className='flex flex-wrap py-8 px-4 items-center '>
        <div className='w-1/4'>
          <Slider {...settings}>
            {productData?.images.map((src, index) => (
              <img key={index} src={src} alt="" className='w-full' />
            ))}
          </Slider>
        </div>
        <div className='w-3/4 p-10'>
          <h1 className='text-lg font-semibold text-gray-950 mb-3'>{productData?.title}</h1>
          <p className='text-gray-700 mb-1'>{productData?.description}</p>
          <div className='flex justify-between items-center'>
            <span className='font-medium'>{productData?.price} EGP </span>
            <span>{productData?.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
          </div>
               
                  <span>
                {wishlistLoading[productData.id] ? (
                  <div className="overlay">
                    <div className="lds-ring text-green-600">
                      <div></div><div></div><div></div><div></div>
                    </div>
                  </div>
                ) : null}

                <i
                  onClick={() => wished(productData.id)}
                  className={`fas fa-heart ${wishlistStatus[productData.id] ? 'text-red-500' : 'text-black'}`}
                ></i>
              </span>
          <button onClick={() => addProduct(productData.id)} disabled={loadingProductId === productData?.id} className='px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600 '>
            {loadingProductId === productData?.id ? <i className='fas fa-spinner fa-spin'></i> : '+ Add to Cart'}
          </button>
        </div>
      </div>
      <h2 className='text-center text-4xl font-serif text-green-800 pacifico my-4 '>Similar</h2>
      <div className='flex  flex-wrap py-8 px-4 justify-center items-center gap-3'>
        {relatedProducts.map(product => (
          <div key={product.id} className='w-1/6'>
            <div className='product'>
              <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className='w-full gap-3' />
                <span className='block text-green-600'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className='flex justify-between items-center font-semibold'>
                  <span>{product.price} EGP </span>
                  <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>

         
                </div>
              </Link>
              <button onClick={() => addProduct(product.id)} disabled={loadingProductId === product.id} className='px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600 '>
                {loadingProductId === product.id ? <i className='fas fa-spinner fa-spin'></i> : '+ Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
