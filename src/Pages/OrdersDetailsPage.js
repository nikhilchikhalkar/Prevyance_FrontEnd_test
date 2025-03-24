// OrderDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function OrderDetailsPage() {
  const { id } = useParams(); // Get orderId from URL params
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const adminStatus = localStorage.getItem('isAdmin'); // Get admin status from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("order id",id)
        const response = await fetch(`${process.env.REACT_APP_API_URL}orders/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrder(data.data); 
        } else {
          alert(data.message || 'Error fetching order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        alert('An error occurred while fetching the order details.');
      }
    };

    fetchOrderDetails();
  }, [id, userId, adminStatus, token]);

  if (!order) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Order Details</h2>
        <div>
          <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
          <p>User ID: {order.userId}</p>
          <p>Total: {order.orders.reduce((total, orderItem) => total + orderItem.total, 0)}</p>
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border text-black">Product Name</th>
                <th className="py-2 px-4 border text-black">Quantity</th>
                <th className="py-2 px-4 border text-black">Price</th>
                <th className="py-2 px-4 border text-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orders.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border text-black">{item.productName}</td>
                  <td className="py-2 px-4 border text-black">{item.quantity}</td>
                  <td className="py-2 px-4 border text-black">{item.price}</td>
                  <td className="py-2 px-4 border text-black">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
