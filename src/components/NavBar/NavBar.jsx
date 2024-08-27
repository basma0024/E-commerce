import React, { useState, useContext } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { cartContext } from '../../context/CartContext';
import logo from '../../assets/images/freshcart-logo.svg';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); 
  const { cart } = useContext(cartContext);
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserContext);

  const toggleNavbar = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  function logOut() {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className={`bg-na fixed top-0 left-0 w-full  z-50 bg-slate-100 py-2 ` }>
    <div className="flex items-center justify-between  max-w-screen-xl mx-auto relative" >
    <img src={logo} alt="logo" width={110}/> 
        <button 
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none "
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
        >
            <span className="sr-only p-5">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className={`absolute top-full left-0 w-full bg-white bg-na md:static md:flex md:w-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse p-2  bg-slate-100" >
            {token !==null ? <>
        
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to=''> Home </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='cart'> Cart </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='wishlist'> wish list </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='products'> Products </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='brands'> Brands </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='categories'> Categories </NavLink>  </li>
        </>:null }

            </ul>

            <ul className='flex flex-col lg:flex-row items-center bg-slate-100 ' >

{token ==null ? <div className='bg-slate-100' >

<ul className='md:flex '>

<li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='login'> Log In </NavLink>  </li>
<li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='register'> Register </NavLink>  </li>
</ul>

  
  </div>:null} 

{token !==null ? <><li className='py-2' onClick={logOut}> <span className='mx-2  text-lg text-slate-900 hover:cursor-pointer p-4' to='products'>
<i class="fa-solid fa-cart-shopping text-gray-700 p-2 relative text-2xl">  

<span className='bg-green-600 rounded-md relative -top-4 right-2 px-3 text-white text-sm py-1.5'>{cart?.numOfCartItems }</span> 


</i>

  
   LogOut </span> </li></> :null}


<li className='flex items-center  py-2'>
<li className='fab fa-facebook mx-2 my-2'></li>
<li className='fab fa-twitter mx-2 my-2'></li>
<li className='fab fa-instagram mx-2 my-2'></li>
<li className='fab fa-youtube mx-2 my-2'></li>
<li className='fab fa-facebook mx-2 my-2'></li>
</li>
</ul>

        </div>
    </div>


</nav>


  );
}
