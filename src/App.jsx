import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Forget from './components/forget/Forget';
import UserContextProvider from './context/UserContext';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import VerifyCode from './components/verifyCode/VerifyCode';
import RecetPaasword from './components/resetPaaword/RecetPaasword';
import RecentProducts from './components/RecentProducts/RecentProducts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContext from './context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Wishlist from './components/wishlist/Wishlist';
import WishlistContextProvider from './context/WishlistContext';
import CheckOut from './components/checkOut/CheckOut';
import AllOrders from './components/allOrders/AllOrders';




let query = new QueryClient();

let x = createBrowserRouter([
  { path:'',element:<LayOut/>, children:[
    { index : true , element: <ProtectRoute> <Home/> </ProtectRoute> },
    {path : 'products', element :  <ProtectRoute> <Products/></ProtectRoute> },
    {path : 'brands', element :  <ProtectRoute><Brands/> </ProtectRoute> },
    {path : 'cart', element :  <ProtectRoute> <Cart/></ProtectRoute> },
    {path : 'checkout/:cartId', element :  <ProtectRoute> <CheckOut/></ProtectRoute> },
    {path : 'allorders', element :  <ProtectRoute> <AllOrders/></ProtectRoute> },
    {path : 'wishlist', element :  <ProtectRoute> <Wishlist/></ProtectRoute> },
    {path : '/categories', element :  <ProtectRoute><Categories/></ProtectRoute> },
    {path : '/recentProduct', element :  <ProtectRoute><RecentProducts/></ProtectRoute> },
    {path : '/productDetails/:id/:category', element : <ProtectRoute><ProductDetails/> </ProtectRoute>  },
    {path : 'login', element : <Login/> },
    {path : 'verify', element : <VerifyCode/> },
    {path : 'recetPassword', element : <RecetPaasword/> },
    {path : 'register', element : <Register/> },
    {path : 'forget', element : <Forget/>  },
    {path : '*', element : <NotFound/> },
   
  ]}

])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <QueryClientProvider client={query}>

        <UserContextProvider>

          <CartContext>
          


<WishlistContextProvider>

          

            <RouterProvider router={x}/>
            <Toaster/>
            <ReactQueryDevtools/>
           
          </WishlistContextProvider>

          </CartContext>




        </UserContextProvider>
 

    </QueryClientProvider>

   

    </>
    
     
  )
}

export default App
