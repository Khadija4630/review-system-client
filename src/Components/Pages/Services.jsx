import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Spinner } from '@chakra-ui/react';


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/services?page=${currentPage}&limit=${itemsPerPage}`);
        setServices(response.data.services);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [currentPage]);

  return (
    <div className="p-6">
      <h2 className="text-center font-bold text-4xl mt-5 mb-8">All Services</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" color="purple.500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="card shadow-lg rounded-lg p-3"
              whileHover={{ scale: 1.05 }}
            >
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-purple-500 font-semibold">Category: {service.category}</p>
              <p className="text-purple-500 font-semibold">Price: ${service.price}</p>
              <button
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/services/${service._id}`)}
              >
                See Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 mx-1 bg-purple-500 text-white rounded"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Services;
