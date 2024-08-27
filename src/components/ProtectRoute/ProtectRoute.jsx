import React, { useContext } from 'react'
// import style from './protectRoute.module.css'
import { UserContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom';



export default function ProtectRoute (props) {
const{token}= useContext(UserContext) 
  if(token){

    return props.children;
  }else{
     return <Navigate to={'/login'}></Navigate>
  }

}
