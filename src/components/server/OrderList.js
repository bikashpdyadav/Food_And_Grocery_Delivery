import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://food-grocery-backend.onrender.com/orders');
                //console.log(response.data);
                setOrders(response.data.data);
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
                        <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.order_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.user_name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.transaction_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
