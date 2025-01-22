import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const [activeTab, setActiveTab] = useState('food-active'); // Default active tab
  const user = useSelector((store) => store.user);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'food-active':
        return <div>Food Active Orders Content</div>;
      case 'food-history':
        return <div>Food Order History Content</div>;
      case 'grocery-active':
        return <div>Grocery Active Orders Content</div>;
      case 'grocery-history':
        return <div>Grocery Order History Content</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex flex-col p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-700">Order Details</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4">
        {/* Food Tabs */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Food Orders</h2>
          <div className="flex space-x-2 mt-2">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'food-active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('food-active')}
            >
              Active Orders
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'food-history' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('food-history')}
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
                activeTab === 'grocery-active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('grocery-active')}
            >
              Active Orders
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === 'grocery-history' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('grocery-history')}
            >
              Order History
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 bg-white rounded shadow">{renderTabContent()}</div>
    </div>
  );
};

export default OrderDetails;
