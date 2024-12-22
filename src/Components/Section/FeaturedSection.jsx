// [
//     {
//       "title": "Professional Cleaning",
//       "description": "Expert cleaning services for your home or office.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 100,
//       "details": "Professional cleaners with eco-friendly products to make your space shine."
//     },
//     {
//       "title": "Personal Trainer",
//       "description": "Certified personal trainers to meet your fitness goals.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 50,
//       "details": "Get personalized fitness plans and one-on-one training sessions."
//     },
//     {
//       "title": "Photography",
//       "description": "Capture your precious moments with our professional photography services.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 150,
//       "details": "Professional photographers equipped with state-of-the-art cameras."
//     },
//     {
//       "title": "Event Planning",
//       "description": "Make your events unforgettable with our expert planning services.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 500,
//       "details": "Catering to weddings, corporate events, and parties with complete setups."
//     },
//     {
//       "title": "Gardening",
//       "description": "Transform your backyard with our expert gardening services.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 75,
//       "details": "We specialize in landscaping, maintenance, and planting seasonal flowers."
//     },
//     {
//       "title": "IT Support",
//       "description": "Reliable IT support services for businesses and individuals.",
//       "image": "https://via.placeholder.com/400x300",
//       "price": 120,
//       "details": "Troubleshooting, installations, and network solutions for your tech needs."
//     }
//   ]
  

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
  );
};

export default FeaturedServices;
