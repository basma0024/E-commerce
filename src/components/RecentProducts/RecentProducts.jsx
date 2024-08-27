import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { wishContext } from '../../context/WishlistContext';

export default function RecentProducts() {
  let { addToCart ,setCart} = useContext(cartContext);
  const { addToWishlist } = useContext(wishContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState({});



  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem('wishlistStatus')) || {};
    setWishlistStatus(storedStatus);
  }, []);



  function wished(productId) {
    const isWished = wishlistStatus[productId];
    const updatedStatus = { ...wishlistStatus, [productId]: !isWished };

    setWishlistStatus(updatedStatus);
    localStorage.setItem('wishlistStatus', JSON.stringify(updatedStatus));

    setWishlistLoading(prev => ({ prev, [productId]: true })); 

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
        })
        
      })
      .finally(() => {
        setWishlistLoading(prev => ({ ...prev, [productId]: false })); 
      });
  }



  async function addProduct(productId) {
    setLoadingProductId(productId); 
    try {
      let response = await addToCart(productId);
      if (response.data.status === 'success') {
        setCart(response?.data)
        // console.log(response);
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


  function search(e) {
    setSearchTerm(e.target.value.toLowerCase()); 
  }



  function getRecent() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }



  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent,
    select: (data) => data.data.data
  });



  if (isLoading) return (
    <div className="overlay">
      <div className="lds-ring text-green-600">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );

  

  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <form className="max-w-md mx-auto mt-10">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input value={searchTerm} onChange={search} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-3 focus:outline-0" placeholder="Search..." required />
        </div>
      </form>

      <div className="flex flex-wrap py-8 px-4 items-center">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-1/6 px-2 py-4">
            <div className="product">
              <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} alt={product.title} className="w-full" />
                <span className="block text-green-600">{product.category.name}</span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingsAverage} <i className="fas fa-star text-yellow-400"></i></span>
                </div>
              </Link>

              <span>
                {wishlistLoading[product.id] ? (
                  <div className="overlay">
                    <div className="lds-ring text-green-600">
                      <div></div><div></div><div></div><div></div>
                    </div>
                  </div>
                ) : null}

                <i
                  onClick={() => wished(product.id)}
                  className={`fas fa-heart ${wishlistStatus[product.id] ? 'text-red-500' : 'text-black'}`}
                ></i>
              </span>

              <button
                onClick={() => addProduct(product.id)}
                className="px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600"
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? <i className="fas fa-spinner fa-spin"></i> : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
