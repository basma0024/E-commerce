import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export let cartContext=createContext();

export default function CartContextProvider(props) { 

    let [cart, setCart] = useState(null)

   
        let headers={
            token: localStorage.getItem('token')
        }
    


     function getUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then(data => data)
        .catch(err =>err)
    }




async function getAllItems(){
    let response= await getUserCart();
    console.log(response.data)
    setCart(response.data)
}


useEffect(() => {
    getAllItems();
},[])



    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId}, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    function deleteProduct(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    

    function updateCartCountItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }


    
    function checkOutNow(cartId, url ,formValue){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {shippingAddress: formValue},
             {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    

  return (
    <cartContext.Provider value={{getUserCart,addToCart,updateCartCountItem,deleteProduct,clearCart,cart,setCart , checkOutNow}}>
        {props.children}
    </cartContext.Provider>
  )
}



   