import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Profile() {
  const [userData, setUserData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');

    if (!token) {
      navigate('/login'); 
    } else {
      if (adminStatus === "true") {
        setIsAdmin(true);
      }
      
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}logged/me`, {
            method:"GET",
            headers: {
              'Authorization': `${token}`
            }
          });
          const result = await response.json();
          if (response.ok) {
            setUserData(result.user);
            console.log("user data", result, userData.firstName);
          } else {
            alert('Error fetching user data.');
          }
        } catch (error) {
          console.error('API Error:', error);
          alert('Error fetching user data.');
        }
      };
      fetchUserData();
    }
  }, []);

  const handleEditProfile = (userId) => {
    navigate(`/user/${userId}`); 
  };

  const handleLogout = () => {
    
    localStorage.clear()
    navigate('/login'); 
  };

  const handleAddOrder = () => {
    navigate('/addorder'); 
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Profile</h2>

        <div className="space-y-4">
          {/* Displaying User Info */}
          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">First Name:</strong>
            <p className="text-black">{userData.firstName}</p>
          </div>

          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">Last Name:</strong>
            <p className="text-black">{userData.lastName}</p>
          </div>

          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">Email:</strong>
            <p className="text-black">{userData.email}</p>
          </div>

          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">Mobile:</strong>
            <p className="text-black">{userData.mobile}</p>
          </div>

          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">Address:</strong>
            <p className="text-black">{userData.address}</p>
          </div>
          <div className="mb-4 flex gap-3">
            <strong className="text-sm font-medium text-black">isAdmin:</strong>
            <p className="text-black">{userData.isAdmin ? "Yes" : "No"}</p>
          </div>
        </div>

        <button
          onClick={() => handleEditProfile(userData.userid)} 
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500"
        >
          Edit Profile
        </button>

        {/* Add Order Button */}
        <div className="mt-6">
          <button
            onClick={handleAddOrder} 
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Add Order
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout} 
            className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
