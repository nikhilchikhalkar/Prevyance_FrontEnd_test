import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function AddUserPage() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {} 
  });

  const [showPassword, setShowPassword] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false); 
  const [userId, setUserId] = useState(null);  
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  const token = localStorage.getItem('token');
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');

    if (token) {
      setIsLoggedIn(true);
      if (adminStatus === "true") {
        setIsAdmin(true);
      }
      setUserId(id); 
    }
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && id !== "adduser") {
      
      fetch(`${process.env.REACT_APP_API_URL}logged/getuser/${id}`,{

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        } },)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUserData(data.data); 
            console.log("user data", data); 
            reset(data.data); 
          } else {
            alert('User not found or error fetching data.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          alert('Error fetching user data.');
        });
    }
  }, [isLoggedIn, id, reset]);

  useEffect(() => {
    if (isLoggedIn) {
      if (id === "adduser" && !isAdmin) {
        navigate('/profile'); 
      } else if (id !== "adduser" && id !== userId && !isAdmin) {
        navigate('/profile'); 
      }
    }
  }, [isLoggedIn, isAdmin, id, userId, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');

  useEffect(() => {
    if (firstName || lastName) {
      reset({
        ...userData, 
        firstName,  
        lastName,   
      });
    }
  }, [firstName, lastName, reset, userData]);

  const onSubmit = async (data) => {
    const url = id === "adduser" 
      ? `${process.env.REACT_APP_API_URL}logged/usercreate`  
      : `${process.env.REACT_APP_API_URL}logged/userupdate/${id}`;
  
    const method = id === "adduser" ? 'POST' : 'PUT'; 
  
    try {
      console.log("Sending data:", data);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
  
      // Check 
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text(); 
        console.error('Non-JSON response:', text); 
        alert('The server did not return a valid JSON response.');
        return;
      }
  
      const result = await response.json(); 
  
      if (response.ok) {
        
        console.log(`${id === "adduser" ? "Add user" : "Update"} successful:`, result);
        alert(`${id === "adduser" ? "User Added" : "Update"} successful!`);
        reset();
        navigate("/dashboard"); 
      } else {
        console.error('Error:', result);
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  if (!isLoggedIn || (id !== "adduser" && id !== userId && !isAdmin)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {id === "adduser" ? " Add User" : "Edit User"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
            <input
              id="firstName"
              type="text"
              {...register('firstName')} 
              defaultValue={userData?.firstName || ''} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...register('lastName')} 
              defaultValue={userData?.lastName || ''} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')} 
              defaultValue={userData?.email || ''} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          {id === "adduser" ? (
             <div className="mb-4 relative">
             <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
             <input
               id="password"
               type={showPassword ? 'text' : 'password'} 
               {...register('password')} 
               defaultValue={userData?.password || ''} 
               className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
             />
             <span 
               onClick={togglePasswordVisibility} 
               className="absolute right-3 top-9 cursor-pointer"
             >
               {showPassword ? <FaEyeSlash size={20} className="text-black" /> : <FaEye size={20} className="text-black" />}
             </span>
           </div>
          ) : ""}

          {/* Mobile */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-black">Mobile</label>
            <input
              id="mobile"
              type="text"
              {...register('mobile')} 
              defaultValue={userData?.mobile || ''} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-black">Address</label>
            <textarea
              id="address"
              {...register('address')} 
              defaultValue={userData?.address || ''} 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            {id === "adduser" ? "Add User" : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}

















