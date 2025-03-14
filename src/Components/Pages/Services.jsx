import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet} from "react-helmet-async";
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [toastShown, setToastShown] = useState(false);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://review-system-11.vercel.app/services`);
        const data = response.data;
        setFilteredServices (data);
        setServices(data);
        // toast.success ('Services fetched successfully');
          setFilteredServices(data);
        const uniqueCategories = Array.from(new Set(data.map(service => service.category) .filter(Boolean)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally{
        setLoading(false);
      }
    
    };
    fetchServices();
  }, [toastShown]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://review-system-11.vercel.app/search-services?keyword=${searchKeyword}`
      );
      setFilteredServices(response.data);
    } catch (error) {
      console.error("Error searching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (category) => {
      setSelectedCategory(category);
      if (category === "") {
        setFilteredServices(services); 
      } else {
        const filtered = services.filter(service => service.category === category);
        setFilteredServices(filtered);
      };
  };

if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
  <ClipLoader size={50} color={"#800080"} loading={true} />
</div>;   

  return (
    <div className="px-4 py-8 ">
      <Helmet>
        <title>Services | Review System</title>
      </Helmet>
      <h2 className="text-center font-bold text-4xl mt-8 md:mt-20 lg:mt-16  mb-6">All Services</h2>
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
          {filteredServices.map((service) => (
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
              <div className='mt-auto'>
              <button
                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded w-full"
                onClick={() => navigate(`/services/${service._id}`)}
              >
                See Details
              </button>
              </div>
            </motion.div>
          ))}
        </div>
    </div>
  );
};

export default Services;
