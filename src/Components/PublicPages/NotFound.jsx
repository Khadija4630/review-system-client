import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ClipLoader } from "react-spinners";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <ClipLoader size={50} color={"#800080"} loading={true} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Helmet>
        <title>Not Found | Review System</title>
      </Helmet>
      <h1 className="font-bold text-5xl mb-3">404 - Page Not Found</h1>
      <p className="font-semibold mt-4 mb-3 text-2xl">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="btn text-white bg-purple-500 hover:bg-purple-300 p-4">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
