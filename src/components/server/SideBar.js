import React from 'react';

const SideBar = ({ setActiveTab }) => {
    const adminDetails = {
        name: 'Admin Name',
        email: 'admin@example.com',
    };
    return (
        <aside className="w-full md:w-64 bg-gray-800 text-white p-4 h-screen">
            <div className="p-4 m-4 text-center">
                <div className="inline-block">
                    <p className="font-bold">{adminDetails.name}</p>
                    <p className="text-sm">{adminDetails.email}</p>
                </div>
            </div>
            <ul className="space-y-4">
                <li>
                    <button
                        className="w-full text-left bg-gray-700 hover:bg-gray-600 p-3 rounded"
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Order List
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left bg-gray-700 hover:bg-gray-600 p-3 rounded"
                        onClick={() => setActiveTab('register')}
                    >
                        Register Restaurant
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left bg-gray-700 hover:bg-gray-600 p-3 rounded"
                        onClick={() => setActiveTab('view')}
                    >
                        View Restaurants
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default SideBar;
