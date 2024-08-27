import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { cartContext } from '../../context/CartContext';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
  let {checkOutNow} = useContext(cartContext);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const {cartId}= useParams();

  
  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(40, 'Name must be at most 40 characters')
      .required('details is required'),
    phone: Yup.string()
      .matches(/^01[1250][0-9]{8}$/, 'Phone must be a valid Egyptian phone number')
      .required('Phone is required'),
      city: Yup.string()
      .min(10, 'Name must be at least 10 characters')
      .max(30, 'Name must be at most 30 characters')
      .required('city is required'),
   
  });



async function  handleCheckOut(cartId ,url){
   let response= await checkOutNow(cartId,url , formik.values);
  //  console.log(response);
   if(response.data.status=='success'){
    window.location.href=response.data.session.url
   }

}

const fullUrl = window.location.href;
const baseUrl = fullUrl.split("/").slice(0, 3).join("/");

console.log(baseUrl);

  const formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit:()=>{
        handleCheckOut(cartId,baseUrl)
        // console.log(formik.values);
    },
    validationSchema,

    
  });


  return (
    <>

<Helmet>
        <title>Checkout</title>
      </Helmet>
   
  <div className='py-20 max-w-xl mx-auto'>


<h1 className='text-3xl font-bold pb-3 text-green-600'>Pay Now</h1>
  <form onSubmit={formik.handleSubmit}>






  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" value={formik.values.details} id="floating_details" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer " placeholder=" "  />
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details</label>
  </div>
  {/* validate */}
{ formik.errors.details && formik.touched.details? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600 " role="alert">
  <p>{formik.errors.details}</p>
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
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" value={formik.values.city} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city</label>
  </div>
    
{/* validate */}
{ formik.errors.city && formik.touched.city? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-600 " role="alert">
  <p>{formik.errors.city}</p>
</div> :null}

 
 
  
<button 
  type="submit" 
  disabled={!formik.isValid || !formik.dirty} 
  className="text-white bg-green-950 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
>
  Pay
</button>

  </form>
  </div>
    
    </>
  )
}
