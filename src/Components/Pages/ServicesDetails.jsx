import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Routes/Router";
import Rating from 'react-rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { Helmet} from "react-helmet-async";
import CountUp from "react-countup";

const ServicesDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [reviewCount, setReviewCount] = useState(0);
  const [categoryReviewCount, setCategoryReviewCount] = useState(0);


  useEffect(() => {
    const fetchServicesDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://review-system-11.vercel.app/services/${id}`, { withCredentials: true }
        );
        const serviceData = response.data;
        setService(serviceData);
        const reviewsResponse = await axios.get(
          `https://review-system-11.vercel.app/reviews/${id}`,
          { withCredentials: true }
        );
        const { serviceReviews, categoryReviews } = reviewsResponse.data;
        if (serviceReviews && categoryReviews) {
          setReviews(serviceReviews);
          setCategoryReviews(categoryReviews);
          setReviewCount(serviceReviews.length);
          setCategoryReviewCount(categoryReviews.length);
        } else {
          console.error("Invalid data structure:", reviewsResponse.data);
        }
  toast.success ("Service details fetched successfully");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesDetails();
  }, [id]);

  const addReview = async () => {
    if (!user) {
      toast.error("You need to be logged in to add a review!");
      return;
    }
    try {
      const reviewData = {
        reviewText: newReview,
        rating,
        displayName: user.displayName,
        photoURL: user.photoURL,
        serviceId: id,
        postedDate: new Date(),
        userEmail:user.email,
      };
     const response= await axios.post("https://review-system-11.vercel.app/my-reviews", reviewData,
       {withCredentials:true, headers: { 'Content-Type': 'application/json'} });
       const newReviewData = response.data.review;
         setReviews((prevReviews) => [...prevReviews, newReviewData]);
         setCategoryReviews((prevCategoryReviews) => [
           ...prevCategoryReviews,
           newReviewData,
         ]);
   
         setReviewCount((prevCount) => prevCount + 1);
         setCategoryReviewCount((prevCount) => prevCount + 1); 
      setNewReview("");
      setRating(0);
     
      toast.success("Review added successfully");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <ClipLoader size={50} color={"#800080"} loading={true} />
  </div>;

const { title, description, image, price, details, location, duration, ratings, category } = service;
  
  return (
    <div className="p-6">
       <Helmet>
        <title>Details | Review System</title>
      </Helmet>
      <div className="  rounded-lg shadow-lg p-4 border border-gray-300 mb-8">
        <h1 className="text-4xl font-bold text-center">{title}</h1>
        <img
          src={image}
          alt={title}
          className="w-full h-80 object-cover rounded-lg mt-4"
        />
        
        <p className="mt-4 text-gray-600 text-xl  font-medium">Details - {details}</p>
        <p className="mt-4 text-gray-600  font-medium text-xl ">Description : {description}</p>
        <p className="mt-4 font-semibold text-lg">Location : {location}</p>
        <p className="mt-4 font-semibold text-lg ">Duration : {duration}</p>
        <p className="mt-4 font-semibold text-lg">Category : {category}</p>
        <p className="mt-4 font-semibold text-lg">Price : ${price}</p>
        <div className="mt-4" style={{ fontSize: '2rem' }}>
        <p className="font-semibold text-lg">Rating : 
        <Rating 
          initialRating={ratings} 
          readonly 
          fullSymbol= {<FontAwesomeIcon icon={faStar} className="text-yellow-500" />}
          emptySymbol= {<FontAwesomeIcon icon ={faStarHalfAlt} className="text-yellow-300"/>}
         
        />
        </p>
      </div>
       </div>
       
     <div className="mb-8">
        <h2 className="text-2xl font-bold">New Added Reviews
        <CountUp start={0} end={reviewCount} duration={1} className="text-purple-500 ml-2" /></h2>
        {reviews?.map((review, index) => (
          <div key={index} className="p-4 border rounded-lg my-4">
            <div className="flex items-center mb-2">


            { user?.photoURL &&(
  <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />

)
}

    
            </div>
  <p className="font-semibold">{user?.displayName}</p>
 
            <p>{review?.reviewText}</p>
            <p className="text-yellow-500"  style={{ fontSize: '2rem,pr-2' }}>
              <Rating initialRating={review?.rating} readonly  fullSymbol= {<FontAwesomeIcon icon={faStar} className="text-yellow-500" />}
          emptySymbol= {<FontAwesomeIcon icon ={faStarHalfAlt} className="text-yellow-300"/>} />
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(review?.postedDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Reviews for {category} Category</h2>
        <p className="text-lg font-semibold text-purple-500">Total reviews for {category}: {categoryReviewCount}</p>
        {categoryReviews?.map((review, index) => (
          <div key={index} className=" grid grid-cols-1 md:grid-cols-2 ">
           <div className="w-full p-4 border rounded-lg my-4"> <p className=" font-bold text-2xl text-center"> {review?.serviceTitle}</p>
            <p className="text-xl mb-2 mt-2 font-semibold text-center">{review?.reviewMessage}</p>
            <Rating
              initialRating={review?.rating}
              readonly
              fullSymbol={<FontAwesomeIcon icon={faStar} className="text-yellow-500 text-xl" />}
              emptySymbol={<FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-300 text-xl " />}
            />
            <p className=" text-lg text-purple-500 text-end"> Posted by {review?.author}</p></div>
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
        <Rating onChange={(rate) => setRating(rate)} style={{ fontSize:'2rem' }}   fullSymbol= {<FontAwesomeIcon icon={faStar} className="text-yellow-400" />}
          emptySymbol= {<FontAwesomeIcon icon ={faStarHalfAlt} className="text-yellow-300"/>}/>
        <button
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
          onClick={addReview}
        >
          Submit Review
        </button>
      </div>
      
    </div>
  );
};

export default ServicesDetails;
