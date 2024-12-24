import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../../Routes/Router";
import { ClipLoader } from "react-spinners";

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
        const response = await axios.get(`http://localhost:5000/my-reviews?userEmail=${user.email}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);

      }
    };

    if (user?.email) {
      fetchReviews();
    }
  }, [user?.email]);

  // Open Update Modal
  const handleUpdate = (review) => {
    setSelectedReview(review);
    setIsUpdateModalOpen(true);
  };

  // Open Delete Modal
  const handleDelete = (review) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/my-reviews/${selectedReview._id}`);
      setReviews(reviews.filter((review) => review._id !== selectedReview._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
  <ClipLoader size={50} color={"#800080"} loading={true} />
</div>;

  return (
    <div className="container mx-auto py-8 px-4">
        <Helmet>
        <title>My Reviews | Review System</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center mb-6">My Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            className="bg-white p-4 rounded shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2">{review.serviceTitle}</h3>
            <p className="text-gray-600 mb-2">{review.text}</p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-500">⭐ {review.rating}</span>
              <div>
                <button
                  onClick={() => handleUpdate(review)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(review)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Update Modal */}
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
                    text: e.target.text.value,
                    rating: e.target.rating.value,
                  };
                  const response = await axios.put(
                    `http://localhost:5000/my-reviews/${selectedReview._id}`,
                    updatedReview
                  );
                  setReviews((prev) =>
                    prev.map((review) =>
                      review._id === response.data._id ? response.data : review
                    )
                  );
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
                  defaultValue={selectedReview.text}
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
