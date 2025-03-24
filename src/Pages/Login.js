import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import show/hide icons

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();


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


  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      console.log("user data", data)
      const response = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Login successful:', result);
        localStorage.setItem('token',result.token)
        localStorage.setItem('isAdmin',result.isAdmin)
        localStorage.setItem('userId',result._id)
        alert('Login successful!');

        // Redirect based on isAdmin flag
        if (result.isAdmin === true) {
          navigate('/dashboard'); // Admin 
        } else if (result.token && result.isAdmin === false ) {
          navigate('/profile'); // User profile
        }
      } else {
  
        console.error('Error during login:', result);
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required', pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              } })}
              className={`mt-1 block w-full px-3 py-2 border text-black  ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'} // Toggle
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 block w-full px-3 py-2 border text-black  ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            <span 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} className="text-black" /> : <FaEye size={20} className="text-black" />}
            </span>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Forgot Password link */}
          <div className="text-center mt-4">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          {/* Register link */}
          <div className="text-center mt-2">
            <p className="text-sm">
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
