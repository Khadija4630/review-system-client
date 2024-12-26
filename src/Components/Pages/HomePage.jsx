import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MeetOurPartners from "../Section/MeetOurPartners";
import Banner from "../Banner/Banner";
import FeaturedServices from "../Section/FeaturedSection";
import ChooseUs from "../Section/ChooseUs";
import CustomerReviews from "../Section/CustomerReviews";
import SubscribeSection from "../Section/SubscribeSection";
import CountUp from "../Section/CountUp";
const HomePage = () => {
  const location = useLocation();

  const hideComponents = [
    "/services",
    "/services:id",
    "/my-services",
    "/add-service",
    "/my-reviews",
    "/login",
    "/register",
  ];
  return (
    <div className=" max-w-7xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {!hideComponents.includes(location.pathname) && (
        <>
          <Banner></Banner>
          <FeaturedServices></FeaturedServices>
          <CustomerReviews></CustomerReviews>
          <MeetOurPartners></MeetOurPartners>
          <section className="stats bg-gray-100 py-10">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Statistics
              </h2>
              <CountUp />
            </div>
          </section>
          <ChooseUs></ChooseUs>
          <SubscribeSection></SubscribeSection>
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
