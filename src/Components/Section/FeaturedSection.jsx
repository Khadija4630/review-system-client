

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://review-system-client-11.web.app/featured-services');
        setServices(response.data);
        toast.success ('Featured Section fetched successfully');
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div >
        <h2 className='text-center font-bold text-4xl mt-5 mb-8'> Featured Section</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {services.map((service) => (
        <motion.div key={service._id} className="card shadow-lg  rounded-lg p-3" whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{  duration: 0.6 }}>
          <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h2 className="text-xl font-bold">{service.title}</h2>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-purple-500 font-semibold">Price: ${service.price}</p>
          <div className='mt-auto'> <button
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded w-full"
            onClick={() => navigate(`/services/${service._id}`)}
          >
            See Details
          </button></div>
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default FeaturedServices;
