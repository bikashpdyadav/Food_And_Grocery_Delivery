import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending orders
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get("https://food-grocery-backend.onrender.com/orders", {
          params: { status: "order_placed" },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.patch("https://food-grocery-backend.onrender.com/acceptorder", {
        order_id: orderId,
      });
      alert("Order accepted successfully!");
      setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-lg">Loading pending orders...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Available Pending Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No pending orders available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            >
              <h3 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h3>
              <hr className="my-2" />
              <p className="text-sm mb-2">
                <strong>Customer:</strong> {order.user_name}
              </p>
              <p className="text-sm mb-2">
                <strong>Order Total:</strong> ₹{order.amount}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                <strong>Placed At:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleAcceptOrder(order.order_id)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Accept Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;
