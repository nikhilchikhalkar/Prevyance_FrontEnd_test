import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddOrderPage() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {},
  });
  const [orders, setOrders] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };

  const handleAddProduct = () => {
    const productName = watch("productName");
    const quantity = watch("quantity");
    const price = watch("price");
    const total = calculateTotal(quantity, price);

    const newOrder = {
      productName,
      quantity,
      price,
      total,
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setGrandTotal((prevTotal) => prevTotal + total);
    reset(); 
  };

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}orders/create`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          userId,
          orders,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Order Created Successfully");
        navigate("/profile"); // Navigate 
      } else {
        alert(result.message || "Error creating order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting your order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Add Order</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-black">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              {...register("productName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-black">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              {...register("quantity")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-black">
              Price
            </label>
            <input
              id="price"
              type="number"
              {...register("price")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md"
          >
            Add Product
          </button>

          {/* Grand Total */}
          <div className="mt-4 text-black">
            <p>Grand Total: {grandTotal}</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md mt-6"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}
