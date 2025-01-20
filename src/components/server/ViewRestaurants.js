import React, { useState, useEffect } from 'react';
import { CDN_URL } from '../utils/constants';
import axios from "axios";

const ViewRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        console.log(response.data);
        setRestaurants(response.data);
      } catch (err) {
        setError("Failed to fetch restaurant data");
      }
    };
    fetchRestaurantData();
  }, []);

  // Handle list item expansion
  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
      {restaurants.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant.rt_id} className="border p-4 rounded shadow">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(restaurant.rt_id)}
              >
                <span className="font-bold">{restaurant.rt_name}</span>
                <button className="text-blue-500">
                  {expanded === restaurant.rt_id ? "Collapse" : "Expand"}
                </button>
              </div>
              {expanded === restaurant.rt_id && (
                <div className="mt-4 text-sm space-y-2 w-1/5">
                  <img
                    src={CDN_URL + restaurant.cloudinary_image_id}
                    alt={restaurant.rt_name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p><strong>Locality:</strong> {restaurant.locality}</p>
                  <p><strong>Area:</strong> {restaurant.area_name}</p>
                  <p><strong>Cost for Two:</strong> ₹{restaurant.cost_for_two}</p>
                  <p><strong>Average Rating:</strong> {restaurant.avg_rating}</p>
                  <p><strong>Total Ratings:</strong> {restaurant.total_ratings}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {restaurant.is_open ? "Open" : "Closed"}
                  </p>
                  <p>
                    <strong>Next Close Time:</strong>{" "}
                    {new Date(restaurant.next_close_time).toLocaleString()}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRestaurants;
