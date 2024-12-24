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


const router = createBrowserRouter([

  
  {
    path: "/",
    element: <HomePage ></HomePage>,
    children: [
      {
        path: "/my-reviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "/services",
        element: <Services></Services>,
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
        }
      ]
      },
      {
        path:'*',
        element:<NotFound></NotFound>,
      },
      {
        path: "/about-us",
        element:<h2>h1</h2>,
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
