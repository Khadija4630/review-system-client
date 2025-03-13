import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import axios from "axios";


const Statistics = () => {
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userRes, reviewRes, serviceRes] = await Promise.all([
          axios.get("https://review-system-11.vercel.app/counts/users"),
          axios.get("https://review-system-11.vercel.app/counts/reviews"),
          axios.get("https://review-system-11.vercel.app/counts/services"),
        ]);

        setUserCount(userRes.data.userCount);
        setReviewCount(reviewRes.data.reviewCount);
        setServiceCount(serviceRes.data.serviceCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-lg text-gray-500">Loading counts...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10 ">
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Users</h3>
        <div className="text-4xl text-purple-600 font-bold">
          <CountUp start={0} end={userCount} duration={2} />
        </div>
      </motion.div>
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Reviews</h3>
        <div className="text-4xl text-purple-600 font-bold">
          <CountUp start={0} end={reviewCount} duration={2} />
        </div>
      </motion.div>
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md text-center "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Services</h3>
        <div className="text-4xl text-purple-600 font-bold">
          <CountUp start={0} end={serviceCount} duration={2} />
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
