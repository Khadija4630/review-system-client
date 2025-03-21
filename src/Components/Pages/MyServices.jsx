import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../Routes/Router";
import UpdateModal from "../Modals/UpdateModal";
import {toast} from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { Helmet} from "react-helmet-async";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`https://review-system-11.vercel.app/my-services`, {withCredentials:true , headers :{
          'Content-Type': 'application/json'
        }} );
        setServices(response.data);
        setLoading (false);
        // toast.success(' My Services fetched successfully');
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [user.email]);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = (service) => {
    setSelectedService(service);
    setIsUpdateModalOpen(true);
  };

  const updateService = async (updatedService) => {
    try {
      
      const response = await axios.put(
        `https://review-system-11.vercel.app/my-services/${selectedService._id}`,
        updatedService,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
  
      setServices((prev) =>
        prev.map((service) =>
          service._id === response.data._id ? response.data : service
        )
      );
      toast.success('Service updated successfully');
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update the service');
    }
  };


  const handleDelete = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
     
      await axios.delete(`https://review-system-11.vercel.app/my-services/${selectedService._id}`,{ withCredentials:true, headers: { 'Content-Type': 'application/json'} });
      setServices(services.filter((service) => service._id !== selectedService._id));
      setIsDeleteModalOpen(false);
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

 if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
   <ClipLoader size={50} color={"#800080"} loading={true} />
 </div>;

  return (
    <div className="container mx-auto py-8 px-4">
        <Helmet>
        <title>My Services | Review System</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6 mt-8 md:mt-20 lg:mt-16">My Services</h2>
      <input
        type="text"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service) => (
            <tr key={service._id} className="text-center">
              <td className="border border-gray-300 p-2">{service.title}</td>
              <td className="border border-gray-300 p-2">{service.category}</td>
              <td className="border border-gray-300 p-2">${service.price}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleUpdate(service)}
                  className="bg-purple-500 text-white px-3 py-1 rounded mr-2 mb-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(service)}
                  className="bg-red-400 text-white px-3 py-1 rounded mb-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <UpdateModal
          service={selectedService}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updateService) }
          // => {
          //   setServices((prev) =>
          //     prev.map((service) => (service._id === updatedService._id ? updatedService : service))
          //   );
          //   setIsUpdateModalOpen(false);
          // }
        />
      )}

      {isDeleteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyServices;
