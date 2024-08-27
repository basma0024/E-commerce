import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Cart() {
  let { getUserCart, updateCartCountItem, deleteProduct, clearCart, setCart, cart } = useContext(cartContext);

  const [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    let response = await getUserCart();
    console.log(response);
    setCartDetails(response?.data.data);
  }

  async function updateCartCount(productId, count) {
    let response = await updateCartCountItem(productId, count);
    setCartDetails(response?.data.data);
    // console.log(response);
  }

  async function deleteItem(productId) {
    let response = await deleteProduct(productId);
    setCartDetails(response?.data.data);
    setCart(response?.data);
    // console.log(response);
  }

  async function clear() {
    let response = await clearCart();
    setCartDetails(response.data.data);
    setCart(response?.data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>

<Helmet>
        <title>Cart</title>
      </Helmet>
      <div className='flex justify-center space-x-8 p-5'>
        <p className='text-center text-[30px] font-semibold'>
          Total Price: <span className='text-[25px] text-green-700'>{cartDetails?.totalCartPrice} EGP</span>
        </p>
        <p className='text-center text-[20px] font-semibold'>
          Total Number Of Items: <span className='text-[25px] text-green-700'>{cart?.numOfCartItems}</span>
        </p>
      </div>

      <div className='flex justify-center'>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800">
          <Link to={'/checkout/' + cartDetails?._id}>Check out</Link>
        </button>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="flex flex-col items-center mx-auto">
          <table className="w-3/4 text-sm text-left rtl:text-right">
            <tbody>
              {cartDetails?.products?.map((product) => (
                <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    <span className='text-black font-medium text-xl inline-block pb-2'>{product.product.title}</span> <br />
                    <span className='text-black font-medium text-md inline-block pb-2'>{product.price} EGP</span> <br />
                    <span onClick={() => deleteItem(product.product.id)} className="font-semibold text-red-600 dark:text-red-500 cursor-pointer inline-block pb-2">
                      <i className="fa-solid fa-trash p-1"></i>
                      Remove
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center p-3">
                      <button onClick={() => updateCartCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1.5 text-sm font-medium h-6 w-6 text-green-500 bg-white border border-green-300 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-green-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <div className="ms-3">
                        <span className='text-black text-[18px]'>{product.count}</span>
                      </div>
                      <button onClick={() => updateCartCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1.5 ms-3 text-sm font-medium text-green-500 bg-white border border-green-300 rounded-md focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-green-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cartDetails?.products?.length > 0 && (
            <div className="mt-4">
              <button onClick={() => clear()} type="button" className="text-green-700 hover:text-white border text-lg border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center  dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 ">
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
