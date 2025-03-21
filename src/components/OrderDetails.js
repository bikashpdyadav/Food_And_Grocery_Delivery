import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import Map from "../components/map/MapComponent"; // Import your map component here

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState("food-active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderLocation, setOrderLocation] = useState(null); // State to store the order location
  const [mapVisibility, setMapVisibility] = useState({}); // Track visibility of maps for each order
  const [progress, setProgress] = useState({}); // Track progress for each order
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/orders?userId=${user.uid}`
        );
        setOrders(response.data.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  useEffect(() => {
    // Load progress from localStorage on mount
    const storedProgress = JSON.parse(localStorage.getItem("orderProgress")) || {};
    setProgress(storedProgress);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const updatedProgress = { ...prevProgress };
        let isProgressUpdated = false;
  
        Object.keys(updatedProgress).forEach((orderId) => {
          if (updatedProgress[orderId] < 100) {
            updatedProgress[orderId] += 100 / (5 * 60); // Increment progress
            isProgressUpdated = true;
          }
        });
  
        // Save updated progress to localStorage
        if (isProgressUpdated) {
          localStorage.setItem("orderProgress", JSON.stringify(updatedProgress));
        }
  
        return updatedProgress;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  // When a new order is accepted, initialize its progress
  useEffect(() => {
    const acceptedOrders = orders.filter(order => order.status === "accepted");
    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      acceptedOrders.forEach((order) => {
        if (!newProgress[order.order_id]) {
          newProgress[order.order_id] = 0;
        }
      });
      localStorage.setItem("orderProgress", JSON.stringify(newProgress));
      return newProgress;
    });
  }, [orders]);
  

  const filteredOrders = orders.filter((order) => {
    const isFood = activeTab.includes("food");
    const isActive = activeTab.includes("active");
    const isDelivered = order.status === "delivered";

    return (
      order.type === (isFood ? "food" : "grocery") &&
      (isActive ? !isDelivered : isDelivered)
    );
  });

  const handleTrackOrder = async (orderId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/ordertrack?order_id=${orderId}`
      );
      const data = response.data;
      setOrderLocation(data.order[0]); // Store the location data in state
      setMapVisibility((prev) => ({
        ...prev,
        [orderId]: !prev[orderId], // Toggle map visibility
      }));
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const renderTabContent = () => {
    if (loading) {
      return <div>Loading orders...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (filteredOrders.length === 0) {
      return <div>No orders found.</div>;
    }

    return (
      <ul className="space-y-4">
        {filteredOrders.map((order) => (
          <li
            key={order._id}
            className="w-full p-4 border rounded shadow flex flex-col space-y-4 hover:bg-gray-100"
          >
            <div className="flex justify-between items-center">
              <div className="w-3/12">
                <p>
                  <strong>Order ID:</strong> {order.order_id}
                </p>
                <p>
                  <strong>Description:</strong> {order.type}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Amount:</strong> ${order.amount}
                </p>
              </div>
              <div className="w-9/12">
                {mapVisibility[order.order_id] ? (
                  <div>
                    <div className="mt-4">
                      <Map location={orderLocation} />
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() =>
                          setMapVisibility((prev) => ({
                            ...prev,
                            [order.order_id]: false, // Hide the map
                          }))
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                      >
                        Hide Map
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleTrackOrder(order.order_id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                    >
                      Track Order
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {order.status === "accepted" && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progress[order.order_id] || 0}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2 text-gray-500">
                  Delivery Progress: {Math.min(progress[order.order_id] || 0, 100)}%
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col p-6 space-y-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Order Details</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4">
          {/* Food Tabs */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Food Orders</h2>
            <div className="flex space-x-2 mt-2">
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "food-active"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("food-active")}
              >
                Active Orders
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "food-history"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("food-history")}
              >
                Order History
              </button>
            </div>
          </div>

          {/* Grocery Tabs */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Grocery Orders</h2>
            <div className="flex space-x-2 mt-2">
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "grocery-active"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("grocery-active")}
              >
                Active Orders
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === "grocery-history"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActiveTab("grocery-history")}
              >
                Order History
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-white rounded shadow">{renderTabContent()}</div>
      </div>
    </>
  );
};

export default OrderDetails;
