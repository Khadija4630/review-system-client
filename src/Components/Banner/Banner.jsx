import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slide1 from '../../assets/slide1.jpg';
import Slide3 from '../../assets/slide6.jpg';
import Slide4 from '../../assets/slide9.avif'

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCurrentSlide((prev) => (prev + 1) % slides.length);
    //     }, 3000); 
    
    //     return () => clearInterval(interval); 
    //   }, []);
  const slides = [
    {
      image: Slide3,
      text: 'Welcome to Service Review System!',
      paragraph:'Here we provide you with the best services.',
    },
    {
      image: Slide1,
      text: 'Discover and Share Service Experiences',
      paragraph: 'Get the best services from our website.',
    },
    {
      image: Slide4,
      text: 'Join Our Community of Reviewers!',
      paragraph: 'Share your experiences and help others.',
    },
   
  ];

  return (
    <div className="relative w-full h-[550px] rounded-xl overflow-hidden">
      {slides.map((slide, index) => (
      
        <motion.div
          key={index}
          className={`absolute w-full h-full transition-all duration-700 ease-in-out`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            x: currentSlide === index ? 0 : 100, 
          }}
          exit={{ opacity: 0, x: -100 }} 
          // transition={{
          //   opacity: { duration: 1 },
          //   x: { type: 'spring', stiffness: 100, damping: 25 },
          // }}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            style={{ opacity: 0.5 }} 
          />
          <div className="absolute bottom-16 bg-opacity-50 text-black w-full p-4 text-center font-bold text-3xl">
            {slide.text}
            <p className="text-lg mt-2">{slide.paragraph}</p>
          </div>
        </motion.div>
      ))}
           <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-800 text-5xl opacity-75 hover:opacity-100 transition-opacity duration-300"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-purple-800 text-5xl   opacity-75 hover:opacity-100 transition-opacity duration-300"
      >
        &gt;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>

  );
};

export default Banner;
