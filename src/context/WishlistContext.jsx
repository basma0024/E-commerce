import axios from 'axios';
import React, { createContext } from 'react'


export let wishContext=createContext();
export default function WishlistContextProvider(props) { 

   
    let headers={
        token: localStorage.getItem('token')
    }

    function getUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
             headers 
            })
         .then(data => data)
         .catch(err =>err)
     }


     function removeWishlist(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

     function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId}, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }



    return (
        <wishContext.Provider value={{getUserWishlist,removeWishlist,addToWishlist}}>
            {props.children}
        </wishContext.Provider>
      )
}