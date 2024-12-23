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
import ReviewsPage from './Components/Pages/ReviewsPage';
import HomePage from './Components/Pages/HomePage';
import Router from './Routes/Router';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ServicesDetails from './Components/Pages/ServicesDetails';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([

  
  {
    path: "/",
    element: <HomePage ></HomePage>,
    children: [
      {
        path: "/reviews",
        element: <ReviewsPage />,
      },
      {
        path: "/services-page",
        element: <Services></Services>,
        },
      {
        path: "/services/:id",
        element: <ServicesDetails></ServicesDetails>,
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
    ])

createRoot(document.getElementById('root')).render(
<StrictMode>
       <Router>
        <RouterProvider router={router} />
        </Router>
        <ToastContainer />
</StrictMode>
)
