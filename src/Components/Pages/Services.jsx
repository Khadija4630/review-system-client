import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet} from "react-helmet-async";
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/services`);
        setServices(response.data);
        toast.success ('Services fetched successfully');
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally{
        setLoading(false);
      }
    
    };
    fetchServices();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/search-services?keyword=${searchKeyword}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error searching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/filter-services?category=${category}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error filtering services:", error);
    } finally {
      setLoading(false);
    }
  };

if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
  <ClipLoader size={50} color={"#800080"} loading={true} />
</div>;   

  return (
    <div className="p-6">
      <Helmet>
        <title>Services | Review System</title>
      </Helmet>
      <h2 className="text-center font-bold text-4xl mt-5 mb-8">All Services</h2>
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFilter(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

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
    </div>
  );
};

export default Services;
