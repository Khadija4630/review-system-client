import React from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MeetOurPartners from '../Section/MeetOurPartners';
import Banner from '../Banner/Banner';
import FeaturedServices from '../Section/FeaturedSection';
import ChooseUs from '../Section/ChooseUs';
import CustomerReviews from '../Section/CustomerReviews';
import SubscribeSection from '../Section/SubscribeSection';
const HomePage = () => {
    const location = useLocation();

    const hideComponents = ['/services','/services:id','my-services','/my-services/:id','/add-service', '/my-reviews','/my-reviews/:id','/login','/register'];
    return (
        <div className=' max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {!hideComponents.includes(location.pathname) && (
                <>
            <Banner></Banner>
            <FeaturedServices></FeaturedServices>
            <MeetOurPartners></MeetOurPartners>
            <ChooseUs></ChooseUs>
            <CustomerReviews></CustomerReviews>
            <SubscribeSection></SubscribeSection>
            </>
            )}
            <Footer></Footer>

        </div>
    );
};

export default HomePage;