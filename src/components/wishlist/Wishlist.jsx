import React, { useContext, useEffect, useState } from 'react';
import { wishContext } from '../../context/WishlistContext';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  const { getUserWishlist,removeWishlist,addToWishlist } = useContext(wishContext);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let { addToCart ,setCart,cart } = useContext(cartContext);


  async function getWishlist() {
    try {
      const response = await getUserWishlist();
      console.log('API Response:', response); 
      setWishlistDetails(response?.data?.data); 
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError('Failed to fetch wishlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  }


  async function deleteWishlist(productId) {
    try {
      await removeWishlist(productId);
      setWishlistDetails((prevWishlist) =>
        prevWishlist.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      setError('Failed to remove item. Please try again later.');
    }
  }
  

  async function addProduct(productId) {

    try {
      let response = await addToCart(productId);
      if (response.data.status === 'success') {
        setCart(response?.data);
        console.log(response);
        console.log(cart)

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
  
    }
  }



  useEffect(() => {
    getWishlist();
  }, [getUserWishlist]);
  if (error) return <div>{error}</div>;

  if (loading) return (
    <div className="overlay">
      <div className="lds-ring text-green-600">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );

  return (
    <>
 <Helmet>
        <title>Wish list</title>
      </Helmet>
      <p className=' text-center text-[35px] p-5 text-green-600 font-semibold'> My WishList</p>

    <div className='flex justify-center space-x-8 p-5'>

      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right  ">
         
          <tbody>
            {wishlistDetails && wishlistDetails.length > 0 ? (
              wishlistDetails.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50 ">
                  <td className="p-4">
                    <img
                      src={item.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.title}
                    />
                  </td>

               

                  <td className="px-6 py-4 font-semibold">
                    <span className='text-black font-medium text-xl inline-block pb-2'>{item.title}</span> <br />
                    <span className='text-black font-medium text-md inline-block pb-2'>{item.price} EGP</span> <br />
                    <span onClick={()=> deleteWishlist(item.id)} className="font-semibold text-red-600 dark:text-red-500 cursor-pointer inline-block pb-2">
                      <i className="fa-solid fa-trash p-1"></i>
                      Remove
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    
                  <button  onClick={() => {addProduct(item.id),deleteWishlist(item.id)} }   type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 cursor-pointer">add to card</button>
                  
                  </td>

                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No items in wishlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    
    </>
  );
}
