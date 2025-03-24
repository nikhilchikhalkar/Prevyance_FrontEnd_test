// src/HomePage.js
import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleSignUp = () => {
    navigate('/register'); 
  };
  useEffect(() => {
    handleTokenExpiration(); 
  }, []);

  const isTokenExpired = (token) => {
    if (!token) return true; // If no token, consider it expired
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Compare expiration with current time
  };
  
  // Function to handle token expiration and redirection
  const handleTokenExpiration = () => {
    const token = localStorage.getItem('token'); // Or wherever you store the token
    if (isTokenExpired(token)) {
      localStorage.removeItem('token'); // Remove expired token from localStorage
      navigate('/login')

    }
  };
  
  
    useEffect(() => {
      const isLoggedIn = localStorage.getItem('token')
          const isLoggedInAdmin = localStorage.getItem("isAdmin")
  
      if (isLoggedIn && isLoggedInAdmin) {
          navigate('/dashboard') 
      }
      if (isLoggedIn) {
          navigate('/profile') 
      }
  }, [navigate])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our App</h1>
        <p className="text-gray-600 mb-6">Please sign up or log in to continue</p>
        <div className="space-x-4">
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <button
            onClick={handleSignUp}
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
