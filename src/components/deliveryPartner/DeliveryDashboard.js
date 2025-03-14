import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const DeliveryDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch pending and accepted orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const pendingResponse = await axios.get(
          BASE_URL,
          { params: { status: "order_placed" } }
        );
        setPendingOrders(pendingResponse.data.data || []);

        const acceptedResponse = await axios.get(
          BASE_URL,
          { params: { status: "accepted" } }
        );
        setAcceptedOrders(acceptedResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Accept order and show address modal
  const handleAcceptOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowAddressModal(true);
  };

  const confirmAcceptOrder = async () => {
    try {
      await axios.patch(BASE_URL+"/orderstatus", {
        order_id: selectedOrderId,
        status: "accepted",
      });
      
      await axios.patch(BASE_URL+"/ordertrack", {
        order_id: selectedOrderId,
        driver_location: address,
      });
      
      alert("Order accepted successfully!");
      setShowAddressModal(false);

      // Move the order from pending to accepted
      const acceptedOrder = pendingOrders.find((order) => order.order_id === selectedOrderId);
      setPendingOrders((prev) => prev.filter((order) => order.order_id !== selectedOrderId));
      setAcceptedOrders((prev) => [...prev, { ...acceptedOrder, status: "accepted", address }]);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleTrackOrder = async () => {
    alert("Tracking feature not implemented.");
  };

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="mt-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Delivery Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
        {pendingOrders.length === 0 ? (
          <p className="text-center text-gray-500">No pending orders available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {pendingOrders.map((order) => (
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
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accepted Orders</h2>
        {acceptedOrders.length === 0 ? (
          <p className="text-center text-gray-500">No accepted orders available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {acceptedOrders.map((order) => (
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
                  <strong>Accepted At:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={handleTrackOrder}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  Track Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Enter Delivery Address</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address here..."
            />
            <button
              onClick={confirmAcceptOrder}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mb-2"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowAddressModal(false)}
              className="w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;
