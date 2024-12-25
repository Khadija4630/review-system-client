import { Helmet} from "react-helmet-async";
import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <Helmet>
                <title>About Us | Review System</title>
              </Helmet>
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700">
        Welcome to our service review platform! We are dedicated to helping
        individuals and businesses make informed decisions by providing reliable
        and transparent service reviews. Whether you're looking for detailed
        insights or want to leave your feedback, we're here to empower your
        choices.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Join our community and contribute to a growing network of trusted
        reviews. Together, we aim to build a platform that ensures quality and
        accountability for services across various domains.
      </p>
    </div>
  );
};

export default AboutUs;
