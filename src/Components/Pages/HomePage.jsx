import React from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MeetOurPartners from '../Section/MeetOurPartners';
import Banner from '../Banner/Banner';
import FeaturedServices from '../Section/FeaturedSection';
const HomePage = () => {
    const location = useLocation();

    const hideComponents = ['/my-reviews','/services','/services:id','my-services','/add-service','/login','/register'];
    return (
        <div className=' max-w-6xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {!hideComponents.includes(location.pathname) || (
                <>
            <Banner></Banner>
            <FeaturedServices></FeaturedServices>
            <MeetOurPartners></MeetOurPartners>
            </>
            )}
            <Footer></Footer>

        </div>
    );
};

export default HomePage;