import React, { useState } from 'react';
import axios from 'axios';

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    rt_name: '',
    cloudinary_image_id: '',
    locality: '',
    area_name: '',
    cost_for_two: '',
    avg_rating: '',
    parent_id: '',
    total_ratings: '',
    is_open: true,
    type: '',
    next_close_time: '',
    display_type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/restaurant/restaurants', formData);
      alert('Data submitted successfully');
      console.log(response.data);
      setFormData({
        rt_name: '',
        cloudinary_image_id: '',
        locality: '',
        area_name: '',
        cost_for_two: '',
        avg_rating: '',
        parent_id: '',
        total_ratings: '',
        is_open: '',
        type: '',
        next_close_time: '',
        display_type: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto m-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Insert Restaurant Data</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 capitalize">{key.replace('_', ' ')}</label>
            <input
              type={key === 'cost_for_two' ? 'number' : key === 'next_close_time' ? 'datetime-local' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required={['rt_name', 'cost_for_two'].includes(key)}
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
