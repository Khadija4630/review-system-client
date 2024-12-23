import React from 'react';
import Logo from '../../assets/logo.png';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook ,faInstagram ,faTwitter} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-3 rounded-2xl w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="flex  space-x-4 ">
          <img
            src={Logo}
            alt="Website Logo"
            className="w-16 h-16 object-cover rounded-lg"
          />
        <div>
           
          <h2 className="text-2xl md:text-4xl font-bold mb-4 ">Service Review System</h2>
          <p className="text-gray-400 mb-4">
          Service Review System is your trusted platform for discovering, reviewing, and sharing experiences about various services. Whether you're looking for detailed insights or want to leave your feedback, we're here to help you make informed decisions. Join our community and contribute to a network of reliable service reviews!
          </p>
        </div>
        </div>
        <div className='text-center p-4 md:p-8 lg:p-10'>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-gray-400 hover:text-purple-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-gray-400 hover:text-purple-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="text-gray-400 hover:text-purple-400">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-purple-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="text-gray-400 hover:text-purple-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className='text-center p-4  md:p-8 lg:p-10 '>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Social Links</h3>
          <ul className="space-y-2">
            <li>
            <a href="https://www.facebook.com/profile.php?id=100070584511436" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook}/>
            </a>
            </li>
            <li>
            <a href="https://x.com/Khadija2120" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
            </li>
            <li>
            <a href="https://www.instagram.com/k.hhadija/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
            </li>
            </ul>
            </div>
      </div>
      <p className="text-gray-500 text-lg text-center mt-3">&copy; {new Date().getFullYear()} Service Review System. All rights reserved.</p>
    </footer>
    
  );
};

export default Footer;
