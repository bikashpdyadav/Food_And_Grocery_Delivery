import React from 'react';
import { useLocation } from 'react-router-dom';

const CartSummary = ({ cartItems, totalAmount, navigate }) => {
    const location = useLocation();
    const isFoodSection = location.pathname.startsWith('/food');
    return(
    <>
        {cartItems.length === 0 ? (
            <div>
                <h1 className="text-xl font-bold md:text-2xl text-gray-600 mb-4">Cart is Empty! Add some items to cart.</h1>
                <button
                    className="bg-green-400 py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
                    onClick={() => isFoodSection ? navigate('/food'):navigate('grocery')}
                >
                    Browse Items
                </button>
            </div>
        ) : (
            <div>
                <div className="flex flex-wrap justify-center sm:justify-between items-center m-6">
                    <button
                        className="bg-yellow-400 py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition-colors"
                        onClick={() => navigate('/')}
                    >
                        Add More Items
                    </button>
                    <h2 className="text-xl font-bold p-4">Total: ₹{(totalAmount / 100).toFixed(2)}</h2>
                </div>
            </div>
        )}
    </>
)};

export default CartSummary;
