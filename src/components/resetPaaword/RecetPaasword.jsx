import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function RecetPaasword() {
  const { setToken } = useContext(UserContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    newPassword: Yup.string()
      .matches(/^[A-Z][0-9]{5}$/, 'New password must start with an uppercase letter followed by 5 numbers')
      .required('New password is required'),
  });

  
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setApiError(''); 
      try {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',  {
            email: values.email,  
            newPassword: values.newPassword 
          },);
        
        setToken(data.token); 
        
        navigate('/');
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(error.response.data.message || 'An error occurred');
        } else {
          setApiError('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema,
  });
  return (
    <>

<Helmet>
        <title>Repassword</title>
      </Helmet>
   
  <div className='p-20  mx-auto'>

    

  { apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
    <p>{apiError}</p>
  
  </div> : null}

<h1 className='text-3xl font-medium pb-3 text-black'>Update newPassword</h1>
  <form onSubmit={formik.handleSubmit}>


  <div className="relative z-0 w-full mb-7 group ">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
  </div>

{/* validate */}
{ formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.email}</p>
</div> :null}

  <div className="relative z-0 w-full mb-7 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="newPassword" value={formik.values.newPassword} id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New newPassword</label>
  </div>

{/* validate */}
{ formik.errors.newPassword && formik.touched.newPassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.newPassword}</p>
</div> :null}

  
 <div className='flex items-center justify-between '>


 <button type="submit" className=" mb-2 text-white bg-green-950 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    

    {isLoading?<i className='fas fa-spinner fa-spin px-1'></i>:'Change'}
    </button>

 </div>

  </form>
  </div>
    
    </>
  )
}
