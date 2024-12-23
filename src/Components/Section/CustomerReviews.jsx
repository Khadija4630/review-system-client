import React from 'react';
import { motion } from "framer-motion";

const CustomerReviews = () => {
    return (
        <div>
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
            <div className="p-6 bg-purple-50 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "This platform helped me find the best services in no time. Highly recommended!"
              </p>
              <h3 className="text-purple-700 font-bold text-lg">- John Doe</h3>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "I love how user-friendly and reliable this service review system is."
              </p>
              <h3 className="text-purple-700 font-bold text-lg">- Sarah Lee</h3>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg shadow">
              <p className="text-gray-600 italic mb-4">
                "Great platform for finding trusted reviews and top-rated services!"
              </p>
              <h3 className="text-purple-700 font-bold text-lg">- Alex Kim</h3>
            </div>
          </div>
        </motion.div>
      </motion.section>

        </div>
    );
};

export default CustomerReviews;