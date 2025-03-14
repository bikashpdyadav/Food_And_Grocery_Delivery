import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(BASE_URL+'/orders');
                setOrders(response.data.data);
            } catch (err) {
                setError('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    // Update order status
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(BASE_URL+"/orderstatus", {
                order_id: id,
                status: newStatus,
            });

            // Update state after successful status change
            setOrders(
                orders.map((order) =>
                    order.order_id === id ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            setError('Failed to update order status');
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
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.order_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.user_name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.transaction_id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{order.status}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                >
                                    <option value="order_placed">Order Placed</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="ready_for_pickup">Ready for Pickup</option>
                                    <option value="out_for_delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="canceled_by_customer">Canceled by Customer</option>
                                    <option value="canceled_by_restaurant">Canceled by Restaurant</option>
                                    <option value="delayed">Delayed</option>
                                    <option value="refund_initiated">Refund Initiated</option>
                                    <option value="refund_completed">Refund Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
