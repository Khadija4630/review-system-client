import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from './Components/Pages/Services';
import HomePage from './Components/Pages/HomePage';
import Router from './Routes/Router';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ServicesDetails from './Components/Pages/ServicesDetails';
import MyReviews from './Components/Pages/My Reviews';
import MyServices from './Components/Pages/MyServices';
import AddService from './Components/Pages/AddService';
import PrivateRoute from './Routes/PrivateRoute';
import { HelmetProvider } from "react-helmet-async";
import NotFound from './Components/PublicPages/NotFound';
import AboutUs from './Components/PublicPages/AboutUs';
import ContactUs from './Components/PublicPages/ContactUs';
import FeaturedServices from './Components/Section/FeaturedSection';
import CustomerReviews from './Components/Section/CustomerReviews';

const router = createBrowserRouter([

  
  {
    path: "/",
    element: <HomePage ></HomePage>,
    children: [
      {
        path: "/my-reviews",
        element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute> ,
      },
      {
        path: "/services",
        element: <Services></Services>,
        },
      {
        path: "/featured-services",
        element:<FeaturedServices></FeaturedServices>,
        },
      {
        path: "/customer-reviews",
        element:<CustomerReviews></CustomerReviews>,
        },
      {
        path: "/services/:id",
        element: <ServicesDetails></ServicesDetails>,
        },
        {
          path:"/my-services",
          element:<PrivateRoute><MyServices></MyServices></PrivateRoute>
        },
        {
          path:"/add-service",
          element:<PrivateRoute><AddService></AddService></PrivateRoute>
        },
        {
          path: "/login",
          element: <Login></Login>,

        },
        {
          path: "/register",
          element:<Register></Register>,
        },
      ]
      },
      {
        path:'*',
        element:<NotFound></NotFound>,
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path:"/contact-us",
        element:<ContactUs></ContactUs>,
      },
    ])

createRoot(document.getElementById('root')).render(
<StrictMode>
  <HelmetProvider>
       <Router>
        <RouterProvider router={router} />
        </Router>
        <ToastContainer />
        </HelmetProvider>
</StrictMode>
)
