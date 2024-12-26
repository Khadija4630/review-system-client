import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Helmet } from 'react-helmet-async';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 6) errors.length = 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password)) errors.uppercase = 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(password)) errors.lowercase = 'Password must contain at least one lowercase letter.';
    return errors;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(formData.password);

    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post('https://review-system-client-11.web.app/register', formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success('Registered successfully!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
      <Helmet>
        <title>Register | Review System</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          value={formData.photoURL}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        {errors.length && <p className="text-red-500 text-sm mb-2">{errors.length}</p>}
        {errors.uppercase && <p className="text-red-500 text-sm mb-2">{errors.uppercase}</p>}
        {errors.lowercase && <p className="text-red-500 text-sm mb-2">{errors.lowercase}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Register
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
