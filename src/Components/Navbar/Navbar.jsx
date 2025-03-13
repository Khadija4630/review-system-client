import React, {useContext} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "../../Routes/Router";
import Logo from "../../assets/logo.png"
import axios from "axios";

const Navbar = () => {
    const{ user,setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async() => {
      try{
        const response = await axios.post("https://review-system-11.vercel.app/logout", { withCredentials: true });
        if (response.data.success) {
            localStorage.removeItem("authToken");
            setUser(null); 
            toast.success("Logged out successfully");
            navigate("/login");
          }
  
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  const Links = (
    <>
      <NavLink to="/" className="block text-center text-lg lg:mx-4 mx-2  hover:text-purple-500">Home</NavLink>
      <NavLink to="/services" className="block text-center text-lg lg:mx-4 mx-2  hover:text-purple-500">Services</NavLink>
      <NavLink to="/my-services" className="block text-center text-lg lg:mx-4 mx-2  hover:text-purple-500">My Services</NavLink>
    </>
  );

  const Link = (
    <>
      <NavLink to="/add-service" className="block text-center text-lg lg:mx-4 mx-2  hover:text-purple-500">Add Service</NavLink>
      <NavLink to="/my-reviews" className="block text-center text-lg lg:mx-4 mx-2  hover:text-purple-500">My Reviews</NavLink>
    </>
  );
  return (
    <div className="navbar fixed top-0 left-0 w-full bg-base-100 shadow-lg z-50">
      <div className="navbar-start md:hidden flex md:items-center ">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow bg-base-100 rounded-box z-50"
          >
            {Links}
            {user && (
                <>
            {Link}
            </>
        )}
          </ul>
          
        </div>
      </div>
      <div className="navbar-start flex md:items-center">
        <a href="/" className="flex md:items-center lg:pl-4">
          <img className="w-8 " src={Logo} alt="Logo" />
          <span className="text-xl font-bold ml-2 text-center pt-1 hidden md:block">
           Service Review System
          </span>
        </a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal lg:px-3 ">{Links}</ul>
        {user && (
          <>
            {Link}
          </>
        )}
      </div>
      <div className="navbar-end bg-base-2
      00">
        {
            user ? (
                <>
                    <div className="flex items-center space-x-4 bg-base-200">
              <img 
                src={user.photoURL}
                
                className="w-10 rounded-full text-black"
                
              />
              <span className="hidden md:inline  dark:text-white font-semibold px-2">{user.displayName || "User"}</span>
            </div>
           
              <button onClick={handleLogout} className="btn bg-purple-400 text-white rounded-lg px-4 py-2">Logout</button>
          
                </>
                ): (
           
                    <div className="flex space-x-4 p-2">
                    <button className="bg-purple-400 rounded-xl px-4">
                      <NavLink to="/login">Login</NavLink>
                    </button>
                      <NavLink className="bg-purple-400 rounded-xl px-2" to="/register">Register</NavLink>
                    
                  </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
