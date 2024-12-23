import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseUs = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      <section className="bg-purple-50 py-12 px-6 rounded-lg shadow-md">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-purple-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-purple-700">
                Trusted Reviews
              </h3>
              <p className="text-gray-600">
                Our reviews are from real users who provide honest feedback about the services.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-purple-700">
                Expert Curation
              </h3>
              <p className="text-gray-600">
                We feature only top-rated services to save you time and effort.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <h3 className="text-2xl font-semibold mb-3 text-purple-700">
                Reliable Platform
              </h3>
              <p className="text-gray-600">
                Secure and user-friendly platform to explore, review, and connect with services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseUs;
