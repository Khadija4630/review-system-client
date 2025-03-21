import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../Routes/Router";
import { ClipLoader } from "react-spinners";
import {toast} from 'react-toastify';
import { Helmet} from "react-helmet-async";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://review-system-11.vercel.app/my-reviews`, { withCredentials: true, headers: { "Content-Type": "application/json" } });
        setReviews(response.data);
        // toast.success ('Reviews fetched successfully')
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);

      }
    };

    if (user?.email) {
      fetchReviews();
    }
  }, [user?.email]);

  const handleUpdate = (review) => {
    setSelectedReview(review);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://review-system-11.vercel.app/my-reviews/${selectedReview._id}`, { withCredentials: true , headers: {"Content-Type" :"application/json" }  });
      setReviews(reviews.filter((review) => review._id !== selectedReview._id));
      setIsDeleteModalOpen(false);
      toast.success ('Review deleted successfully')
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
  <ClipLoader size={50} color={"#800080"} loading={true} />
</div>;

  return (
    <div className="container mx-auto py-8 px-4 bg-base-100 ">
        <Helmet>
        <title>My Reviews | Review System</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6 mt-8 md:mt-20 lg:mt-16">My Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            className="bg-white p-4 rounded shadow-lg flex flex-col justify-between h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{review.serviceTitle}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{review.reviewMessage|| review.reviewText}</p>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <span className="text-yellow-500 flex items-center text-lg">⭐ {review.rating}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(review)}
                  className="bg-purple-500 text-white px-3 py-1 rounded "
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(review)}
                  className="bg-red-400 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-end">
        <p className=" font-bold text-sm">{`- ${review.author || review.userName}`}</p>
      </div>
          </motion.div>
        ))}
      </div>

      {isUpdateModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Update Review</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const updatedReview = {
                    ...selectedReview,
                    reviewMessage: e.target.text.value, 
        rating: e.target.rating.value,
                  };
                  const response = await axios.put(
                    `https://review-system-11.vercel.app/my-reviews/${selectedReview._id}`,
                    updatedReview,
                    { withCredentials: true, headers: { "Content-Type": "application/json" } }
                  );
                  setReviews((prevReviews) =>
                    prevReviews.map((review) =>
                      review._id === response.data._id ? response.data : review
                    )
                  );
                  toast.success("Review updated successfully!");
                  setIsUpdateModalOpen(false);

                } catch (error) {
                  console.error("Error updating review:", error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Service Title</label>
                <input
                  type="text"
                  value={selectedReview.serviceTitle}
                  readOnly
                  className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Text Review</label>
                <textarea
                  name="text"
                  defaultValue={selectedReview.reviewMessage}
                  className="w-full border border-gray-300 rounded p-2"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={selectedReview.rating}
                  min="1"
                  max="5"
                  className="w-full border border-gray-300 rounded p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
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

export default MyReviews;
