import React, { useState,useContext, useEffect } from "react";
import { auth} from "../../Firebase/firebase.init"; 
import { signInWithPopup,GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Routes/Router";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location =useLocation();
  const { setUser } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(auth,email, password); 
        const response = await axios.post("http://localhost:5000/login", { email, password }, { withCredentials: true });
        navigate("/"); 
        if (response.data.success) {
          localStorage.setItem("authToken", response.data.user);
          toast.success("Login successful");
          
        }
      } catch (error) {
        toast.error("Invalid email or password");
      }
    };
  
    const handleGoogleLogin = async (e) => {
        try {
          const userCredential = await signInWithPopup(auth, googleProvider);
          const user = userCredential.user;
          setUser ({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
          toast.success("Google Login Is Successful");
          toast.success(`Welcome, ${user.displayName || "User"}!`);
          navigate("/");
        } catch (error) {
          toast.error(error.message  || "Google Login Failed");
        }
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser({
              email:currentUser.email,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            });
            toast.success(`Welcome, ${currentUser.displayName || "User"}!`);
            const intendedPath = location.state?.from || "/"; 
            navigate(intendedPath);
          }
        });
        return () => unsubscribe(); 
    }, [navigate, setUser,location]);
  
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">Login</h2>
  
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Login
            </button>
          </form>
  
          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Login with Google
            </button>
          </div>
  
          <p className="mt-4 text-center text-gray-700">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-600 hover:text-purple-800">
              Register
            </a>
          </p>
  
          <ToastContainer />
        </div>
      </div>
    );
  };
  
  export default Login;