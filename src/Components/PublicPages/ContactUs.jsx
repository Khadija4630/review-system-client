import React from "react";
import { Helmet} from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <Helmet>
                <title>Contact Us | Review System</title>
        </Helmet>
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700">
        We'd love to hear from you! If you have any questions, feedback, or
        suggestions, feel free to reach out to us.
      </p>
      <div className="mt-6">
        <p className="text-lg">
          <strong>Email:</strong> <a href="khadijahaque085@gmail.com">support@example.com</a>
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> +1-514-237-4630
        </p>
        <p className="text-lg">
          <strong>Address:</strong> 1255,Rue St-Catherine,Canada
        </p>
        <p className="text-lg mt-4">
          <strong>Business Hours:</strong>  
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
          <li>Saturday: 10:00 AM - 4:00 PM</li>
          <li>Sunday: Closed</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
