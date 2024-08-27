import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import style from './categories.module.css';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategory = async () => {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return response.data;
   
  };

  const getSubcategories = async (id) => {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      return response.data;
   
  };

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategory
  });

  const { data: subcategoriesData, isLoading: isSubcategoriesLoading, isError: isSubcategoriesError, error: subcategoriesError } = useQuery({
    queryKey: ['subcategories', selectedCategory],
    queryFn: () => getSubcategories(selectedCategory),
    enabled: !!selectedCategory,
  });


  if (isLoading) return (
    <div className="overlay">
      <div className="lds-ring text-green-600">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );

  return (
    <>
     <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-4 w-3/4 mx-auto">
        {data?.data?.map((category) => (
          <div
            key={category._id}
            className='hover:shadow-md hover:shadow-green-600 overflow-hidden cursor-pointer transition-transform transform hover:scale-100'
            onClick={() => setSelectedCategory(category._id)}
          >
            <img
              src={category.image}
              className='w-full h-[400px] object-cover border-2 overflow-hidden'
              alt={category.name}
            />
            <div className='relative bottom-0 p-5 bg-white border-2 border-t-0 rounded-b-md'>
              <h2 className='text-center text-green-700 text-2xl font-semibold'>{category.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8 w-3/4 mx-auto">
          {isSubcategoriesLoading ? (
            <div className="overlay">
              <div className="lds-ring text-green-600">
                <div></div><div></div><div></div><div></div>
              </div>
            </div>
          ) : isSubcategoriesError ? (
            <div>Error fetching subcategories: {subcategoriesError.message}</div>
          ) : (
            subcategoriesData && (
              <div className=" p-5 bg-white rounded-md ">
                <h2 className='text-center text-green-700 text-2xl font-semibold mb-4'>Subcategories </h2>
                {subcategoriesData.data.length > 0 ? (
                  <div className='grid grid-cols-3 gap-4 w-3/4 mx-auto border-3'>
                    {subcategoriesData.data.map(subcategory => (
                      <div key={subcategory._id} className='mb-2  border-2 p-5 text-center rounded-md hover:shadow-md hover:shadow-green-600 hover:rounded-md hover:border-0 transition-transform transform hover:scale-100 '>
                        <h3 className='text-green-600 text-xl'>{subcategory.name}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-center '>No subcategories available</p>
                )}

                
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
