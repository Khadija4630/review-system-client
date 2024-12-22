

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div >
        <h2 className='text-center font-bold text-4xl mt-4'> Featured Section</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {services.map((service) => (
        <div key={service._id} className="card shadow-lg p-4 rounded-lg">
          <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h2 className="text-xl font-bold">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-purple-500 font-semibold">Price: ${service.price}</p>
          <button
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => navigate(`/services/${service._id}`)}
          >
            See Details
          </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FeaturedServices;
