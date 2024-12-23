import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactRating from "react-rating";
import { AuthContext } from "../../Routes/Router";
import Rating from 'react-rating';

const ServicesDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState("");
//   const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchServicesDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/services/${id}`
        );
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesDetails();
  }, [id]);

//   const addReview = async () => {
//     try {
//       const reviewData = {
//         reviewText: newReview,
//         rating,
//         userName: user.name,
//         userPhoto: user.photo,
//         serviceId: id,
//         postedDate: new Date(),
//       };
//       await axios.post("http://localhost:5000/reviews", reviewData, {
//         // headers: { Authorization: `Bearer ${user.token}` },
//       });
//       setReviews((prev) => [...prev, reviewData]);
//       setNewReview("");
//       setRating(0);
//     } catch (error) {
//       console.error("Error adding review:", error);
//     }
//   };

const { title, description, image, price, details, location, duration, ratings, category } = service;
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-lg mt-4"
        />
        
        <p className="mt-2 text-gray-600 text-xl md:text-2xl">{details}</p>
        <p className="mt-4 font-semibold text-lg">Category: {category}</p>
        <p className="mt-4 font-semibold text-lg md:text-xl">Location: {location}</p>
        <p className="mt-4 font-semibold text-lg md:text-xl">Duration: {duration}</p>
        <p className="mt-2 text-gray-600 text-xl md:text-2xl">{description}</p>
        <p className="mt-2 font-semibold text-lg">Price: ${price}</p>
        <div className="mt-4">
        <p className="font-semibold text-lg">Rating:</p>
        <Rating 
          initialRating={5} 
          readonly 
          fullSymbol="🌟"
          emptySymbol="⭐" 
        />
      </div>
       </div>
    {/*  <div className="mb-8">
        <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-lg my-4">
            <div className="flex items-center mb-2">
              <img
                src={review.userPhoto}
                alt={review.userName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <p className="font-semibold">{review.userName}</p>
            </div>
            <p>{review.reviewText}</p>
            <p className="text-yellow-500">
              <ReactRating initialRating={review.rating} readonly />
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(review.postedDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Add a Review</h2>
        <textarea
          className="w-full mt-2 p-2 border rounded-lg"
          rows="4"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
        <ReactRating onChange={(rate) => setRating(rate)} />
        <button
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
          onClick={addReview}
        >
          Submit Review
        </button>
      </div> */}
    </div>
  );
};

export default ServicesDetails;
