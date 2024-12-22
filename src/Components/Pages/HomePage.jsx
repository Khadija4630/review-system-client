import React from 'react';
import { Outlet,useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
const HomePage = () => {
    const location = useLocation();

    const hideComponents = ['/reviews','/services', '/reviews:id','/login','/register'];
    return (
        <div className=' '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default HomePage;