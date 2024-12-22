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
import PrivateRoutes from './Routes/Router';

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
        path: "/services",
        element: <Services></Services>,
        },
      ]
      },
    ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivateRoutes>
    <RouterProvider router={router} />
    </PrivateRoutes>
    <ToastContainer />
  </StrictMode>,
)
