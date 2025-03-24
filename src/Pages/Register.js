import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import show/hide icons

export default function Register({ initialValues }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialValues || {} 
  });

  useEffect(() => {
    
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      const result = await response.json();
      if (response.ok) {
       
        console.log('Registration successful:', result);
        alert('Registration successful!');
        navigate('/login');
      } else {
        
        console.error('Error during registration:', result);
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
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} text-black rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className={`mt-1 block w-full px-3 py-2 border text-black  ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>

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
              type={showPassword ? 'text' : 'password'} // Toggle the input type based on showPassword state
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
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

          {/* Mobile */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-black">Mobile</label>
            <input
              id="mobile"
              type="text"
              {...register('mobile', { required: 'Mobile number is required', pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid mobile number',
              } })}
              className={`mt-1 block w-full px-3 py-2 text-black  border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
            <textarea
              id="address"
              {...register('address', { required: 'Address is required' })}
              className={`mt-1 block w-full px-3 py-2 text-black  border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
