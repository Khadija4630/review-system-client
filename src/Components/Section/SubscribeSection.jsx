import React, { useState } from "react";
import { motion } from "framer-motion";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscription = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <motion.section className="mt-4 mb-2 bg-purple-50 py-12 px-6 rounded-lg shadow-md" initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}>
      <motion.div className="container mx-auto text-center"  initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}>
        <motion.h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6"  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
          Stay Updated
        </motion.h2>
        <motion.p className="text-gray-600 mb-6"  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}>
          Subscribe to our newsletter to receive the latest reviews and updates.
        </motion.p>
        <motion.form
          onSubmit={handleSubscription}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};

export default SubscribeSection;
