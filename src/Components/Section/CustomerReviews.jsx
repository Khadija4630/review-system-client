import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Helmet} from "react-helmet-async";


const CustomerReviews = () => {

  const staticReviews = [
    {
      message: "This platform helped me find the best services in no time. Highly recommended!",
      author: "John Doe",
    },
    {
      message: "I love how user-friendly and reliable this service review system is.",
      author: "Sarah Lee",
    },
    {
      message: "Great platform for finding trusted reviews and top-rated services!",
      author: "Alex Kim",
    },
    {
      message: "Amazing features and easy to use. This platform saved me so much time.",
      author: "Emily Davis",
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/customer-reviews'); 
        setReviews(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(staticReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <ClipLoader size={50} color={'#800080'} loading={true} />
      </div>
    );
  }


    return (
        <div>
          <Helmet>
            <title>Customer Reviews| Review System</title>
          </Helmet>
      <motion.section className="bg-gray-50 opacity-50 py-12 px-6 rounded-lg shadow-md mt-4" initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
        <motion.div className="container mx-auto"  initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}>
          <h2 className="text-center text-3xl md:text-4xl font-bold text-purple-800 mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="p-6 bg-purple-50 rounded-lg shadow"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 italic mb-4">{`"${review.reviewMessage}"`}</p>
              <p className="text-gray-600 italic mb-4">{`"${review.serviceTitle}"`}</p>
              <div className="flex items-center mb-4">
        <span className="text-gray-600 font-medium mr-2">Rating:</span>
        <div className="flex items-center">
        <span className="text-gray-600 font-medium mr-2">{`${review.rating}/5`}</span>
          {[...Array(5)].map((_, starIndex) => (
            <motion.svg
              key={starIndex}
              xmlns="http://www.w3.org/2000/svg"
              fill={starIndex < review.rating ? "gold" : "gray"}
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="mr-1"
              initial={{ scale: 0 }}
              animate={{ scale: starIndex < review.rating ? 1 : 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: starIndex * 0.1,
              }}
            >
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.854 1.415 8.237L12 18.897l-7.415 4.617L6 15.277 0 9.423l8.332-1.268L12 .587z" />
            </motion.svg>
          ))}
        </div>
      </div>
              <h3 className="text-purple-700 font-bold text-lg">{`- ${review.author}`}</h3>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </motion.section>

        </div>
    );
};

export default CustomerReviews;