import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const adminStatus = localStorage.getItem("isAdmin"); // Get admin status from localStorage

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the user is an admin, if not redirect to home or login page
    if (!token || adminStatus !== "true") {
      navigate("/login"); // Redirect to login page (or you can redirect to a different page)
      return;
    }

    const fetchOrders = async () => {
      try {
        
        const apiUrl = `${process.env.REACT_APP_API_URL}orders/get`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`, 
          },
          body: JSON.stringify({ userId, isAdmin: adminStatus }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log(data.data); 
          setOrders(data.data); 
        } else {
          alert(data.message || "Error fetching orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("An error occurred while fetching the orders.");
      }
    };

    fetchOrders();
  }, [userId, adminStatus, navigate]); 

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Order List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-black">Order ID</th>
              <th className="py-2 px-4 border text-black">User ID</th>
              <th className="py-2 px-4 border text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border text-black">{order._id}</td>
                <td className="py-2 px-4 border text-black">{order.userId}</td>
          
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleViewOrder(order._id)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
