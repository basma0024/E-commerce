import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';

export default function Register() {
  const { setToken } = useContext(UserContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name must be at most 10 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^01[1250][0-9]{8}$/, 'Phone must be a valid Egyptian phone number')
      .required('Phone is required'),
    password: Yup.string()
      .matches(/^[A-Z][0-9]{5}$/, 'Password must start with an uppercase letter followed by 5 numbers')
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        setToken(data.token);
        navigate('/');
      } catch (error) {
        setApiError(error.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema,
  });


  return (
    <>


   
  <div className='py-20 max-w-xl mx-auto'>

    

  { apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
    <p>{apiError}</p>
  
  </div> : null}

<h1 className='text-3xl font-bold pb-3 text-green-600'>Register Now</h1>
  <form onSubmit={formik.handleSubmit}>



  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" value={formik.values.name} id="floating_name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer " placeholder=" "  />
      <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
  </div>
{/* validate */}
{ formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600 " role="alert">
  <p>{formik.errors.name}</p>
</div> :null}

  


  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" value={formik.values.phone} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone number</label>
  </div>

  {/* validate */}
{ formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.phone}</p>
</div> :null}

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
  </div>

{/* validate */}
{ formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.email}</p>
</div> :null}

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password} id="floating_pass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_pass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
  </div>

{/* validate */}
{ formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.password}</p>
</div> :null}

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" value={formik.values.rePassword} id="floating_rePass" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_rePass" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
  </div>

  {/* validate */}
{ formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600" role="alert">
  <p>{formik.errors.rePassword}</p>
</div> :null}
  
  <button type="submit" className="text-white bg-green-950 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    

    {isLoading?<i className='fas fa-spinner fa-spin px-1'></i>:'Submit'}
    </button>
  </form>
  </div>
    
    </>
  )
}














