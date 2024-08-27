import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from "react-helmet";


export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const getBrands = async () => {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return response.data;
  };

  const { data: brandsData, isLoading, isError, error } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
  });

  const openModal = (brand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  if (isLoading) return (
    <div className="overlay">
      <div className="lds-ring text-green-600">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );

  if (isError) return <div>Error fetching brands: {error.message}</div>;

  return (
    <>
     <Helmet>
        <title>Brands</title>
      </Helmet>
      <div className="grid grid-cols-3 gap-5 w-3/4 mx-auto">
        {brandsData?.data?.map((brand) => (
          <div
            key={brand._id}
            className='hover:shadow-md hover:shadow-green-600 overflow-hidden cursor-pointer transition-transform transform '
            onClick={() => openModal(brand)}
          >
            <img
              src={brand.image}
              className='w-full h-[200px] object-cover border-2 overflow-hidden'
              alt={brand.name}
            />
            <div className='relative bottom-0 p-5 bg-white border-2 border-t-0 rounded-b-md'>
              <h2 className='text-center text-green-700 text-2xl font-semibold'>{brand.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md max-w-md mx-4 relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-600 text-2xl">&times;</button>
            <h2 className='text-center text-green-700 text-2xl font-semibold mb-4'>{selectedBrand.name}</h2>
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className='w-full h-auto object-cover'
            />
          </div>
        </div>
      )}
    </>
  );
}
