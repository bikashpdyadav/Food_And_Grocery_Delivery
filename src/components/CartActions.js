import React from 'react';

const CartActions = ({ cartItems, user, setShowSignInModal, setShowClearCartModal, displayRazorpay }) => {
    if (cartItems.length)
        return (<div className="flex justify-center mt-4 space-x-4">
            <button
                className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => setShowClearCartModal(true)}
            >
                Clear Cart
            </button>
            <button
                className="p-3 border border-solid border-blue-500 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => {
                    if (user) {
                        displayRazorpay();
                    } else {
                        setShowSignInModal(true);
                    }
                }}
            >
                Pay Now
            </button>
        </div>
        )
};

export default CartActions;
