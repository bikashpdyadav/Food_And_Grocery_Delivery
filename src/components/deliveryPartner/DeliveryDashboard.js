import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch pending and accepted orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const pendingResponse = await axios.get(
          "http://localhost:4000/orders",
          { params: { status: "order_placed" } }
        );
        setPendingOrders(pendingResponse.data.data || []);

        const acceptedResponse = await axios.get(
          "http://localhost:4000/orders",
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

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.patch("http://localhost:4000/acceptorder", {
        order_id: orderId,
      });
      alert("Order accepted successfully!");

      // Move the order from pending to accepted
      const acceptedOrder = pendingOrders.find((order) => order.order_id === orderId);
      setPendingOrders((prev) => prev.filter((order) => order.order_id !== orderId));
      setAcceptedOrders((prev) => [...prev, { ...acceptedOrder, status: "accepted" }]);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleTrackOrder = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        alert(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}`);
        // Optionally, you can send this location to the backend or display it on a map.
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch location. Please enable location services.");
      }
    );
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
    </div>
  );
};

export default DeliveryDashboard;
