import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Routes/Router";
import {toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { Helmet} from "react-helmet-async";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    companyName: "",
    website: "",
    description: "",
    category: "",
    price: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      ...formData,
      addedDate: new Date().toISOString(),
      userEmail: user.email,
    };

    try {
      const response = await axios.post("https://review-system-client-11.web.app/add-service", serviceData);
      if (response.status === 201) {
        setSuccessMessage("Service added successfully!");
        toast.success ("Service added successfully!");  
        setFormData({
          image: "",
          title: "",
          companyName: "",
          website: "",
          description: "",
          category: "",
          price: "",
        });
        toast.success ("Service added successfully!");
        setLoading (false);
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
  <ClipLoader size={50} color={"#800080"} loading={true} />
</div>;

  return (
    <div className="container mx-auto py-8 px-4">
        <Helmet>
        <title>Add Service | Review System</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Service</h2>
      {successMessage && (
        <div className="text-green-500 bg-green-100 p-4 rounded mb-6">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-50 p-6 rounded shadow"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Service Image</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Service Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter service title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter company name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter website URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter service description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter price"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-semibold py-2 rounded hover:bg-purple-600"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
