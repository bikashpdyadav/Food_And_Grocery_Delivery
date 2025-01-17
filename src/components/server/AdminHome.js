import React, { useState } from 'react';
import RestaurantForm from './RestaurantForm';
import OrderList from './OrderList';
import SideBar from './SideBar';
import ViewRestaurants from './ViewRestaurants';

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <OrderList />;
      case "register":
        return <RestaurantForm />;
      case "view":
        return <ViewRestaurants />;
      default:
        return <OrderList />;
    }
  };

  return (
    <div className="relative flex h-screen">
      {/* Sidebar and main content */}
      <div className="flex w-full">
        <SideBar setActiveTab={setActiveTab} />

        {/* Main content area */}
        <div className="flex-grow bg-gray-100 overflow-y-auto">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
