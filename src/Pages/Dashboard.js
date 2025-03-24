

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");

    if (token && adminStatus === "true") {
      setIsAdmin(true);
      fetchUsers(); // Fetch user data if admin
    } else if (token) {
      navigate("/profile"); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}logged/userlist`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data);
      console.log("userlist", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  // user deletion
  const handleDeleteUser = async (userId) => {
    console.log("user id",userId)
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}logged/userdelete/${userId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (response.ok) {
          alert("User deleted successfully!");
          fetchUsers(); 
        } else {
          alert("Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  //  (navigate to /user/:id)
  const handleEditUser = (user) => {
    setSelectedUser(user);
    navigate(`/user/${user}`); 
  };

  

  // loading 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container mx-auto p-6 bg-white h-full">
  <h1 className="text-3xl font-semibold text-gray-900 mb-6">User List</h1>

  {/* Users Table */}
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="px-6 py-4 text-left text-sm font-medium">Id</th>
          <th className="px-6 py-4 text-left text-sm font-medium">First Name</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Last Name</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Email</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Mobile</th>
          <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user._id}
            className={`${
              selectedUser?.id === user._id ? "bg-gray-200" : "bg-white"
            } hover:bg-gray-50 transition duration-200`}
          >
            <td className="px-6 py-4 text-sm text-gray-800">{user._id}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{user.firstName}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{user.lastName}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{user.mobile}</td>
            <td className="px-6 py-4 text-sm text-gray-800 flex space-x-2">
              <button
                onClick={() => handleEditUser(user._id)}
                className="text-blue-600 hover:text-blue-800 focus:outline-none transition duration-200"
              >
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none transition duration-200"
                >
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
