import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await new Promise((resolve) =>
                    setTimeout(() => resolve({
                        "customer_name": "Chinese Wok",
                        "order_id": "e0839ff574213e6f35b3899ebf1fc597",
                        "item_name": "Adugodi",
                        "quantity": 1,
                        "status": "pending",
                    }), 1000)
                );
                setOrders([response]);
            } catch (err) {
                setError('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    // Delete order
    const handleDelete = async (id) => {
        try {
            // Simulate an API call with setTimeout
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(`Deleted order with ID: ${id}`);
                    resolve();
                }, 500)
            );

            // Update state after successful deletion
            setOrders(orders.filter((order) => order.order_id !== id));
        } catch (err) {
            setError('Failed to delete order');
        }
    };

    const handleCancel = async (id) => {
        try {
            // Simulate an API call with setTimeout
            await new Promise((resolve) =>
                setTimeout(() => {
                    console.log(`Canceled order with ID: ${id}`);
                    resolve();
                }, 500)
            );

            // Update state after successful cancellation
            setOrders(
                orders.map((order) =>
                    order.order_id === id ? { ...order, status: 'canceled' } : order
                )
            );
        } catch (err) {
            setError('Failed to cancel order');
        }
    };


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Order List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                        <th className="border border-gray-300 px-4 py-2">Item Name</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.order_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.customer_name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.item_name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.status}</td>
                            <td className="border border-gray-300 px-4 py-2 space-x-2 text-center">
                                {order.status === 'delivered' && (
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(order.order_id)}
                                    >
                                        Delete
                                    </button>
                                )}
                                {order.status === 'pending' && (
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleCancel(order.order_id)}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
