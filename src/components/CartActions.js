// // import React from 'react';

// // const CartActions = ({ cartItems, user, setShowSignInModal, setShowClearCartModal, displayRazorpay }) => {
// //     if (cartItems.length)
// //         return (<div className="flex justify-center mt-4 space-x-4">
// //             <button
// //                 className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
// //                 onClick={() => setShowClearCartModal(true)}
// //             >
// //                 Clear Cart
// //             </button>
// //             <button
// //                 className="p-3 border border-solid border-blue-500 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
// //                 onClick={() => {
// //                     if (user) {
// //                         displayRazorpay();
// //                     } else {
// //                         setShowSignInModal(true);
// //                     }
// //                 }}
// //             >
// //                 Pay Now
// //             </button>
// //         </div>
// //         )
// // };

// // export default CartActions;
// import React, { useState } from 'react';

// const CartActions = ({ cartItems, user, setShowSignInModal, setShowClearCartModal, displayRazorpay }) => {
//     const [isProcessing, setIsProcessing] = useState(false);

//     const handlePayment = async () => {
//         if (user) {
//             setIsProcessing(true); // Show processing state
//             try {
//                 await displayRazorpay(); // Wait for Razorpay to load and complete
//             } catch (error) {
//                 console.error("Payment failed:", error);
//             } finally {
//                 setIsProcessing(false); // Reset processing state
//             }
//         } else {
//             setShowSignInModal(true);
//         }
//     };

//     if (cartItems.length) {
//         return (
//             <div className="flex justify-center mt-4 space-x-4">
//                 <button
//                     className="p-3 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
//                     onClick={() => setShowClearCartModal(true)}
//                 >
//                     Clear Cart
//                 </button>
//                 <button
//                     className={`p-3 border border-solid rounded-full ${
//                         isProcessing
//                             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                             : "bg-blue-100 hover:bg-blue-200 text-blue-800"
//                     } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     onClick={handlePayment}
//                     disabled={isProcessing} // Disable button during processing
//                 >
//                     {isProcessing ? "Processing..." : "Pay Now"}
//                 </button>
//             </div>
//         );
//     }

//     return null; // Return nothing if there are no cart items
// };

// export default CartActions;
import React, { useState } from 'react';

const CartActions = ({ cartItems, user, setShowSignInModal, setShowClearCartModal, displayRazorpay, useraddress, setuserAddress }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const handlePayment = async () => {
        if (!useraddress.trim()) {
            alert("Please enter your address.");
            return;
        }

        setIsProcessing(true); // Show processing state
        try {
            await displayRazorpay(); // Wait for Razorpay to load and complete
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false); // Reset processing state
        }
    };
    
    if (cartItems.length) {
        return (
            <div className="flex flex-col items-center mt-4 space-y-4">
                {showAddressForm ? (
                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Enter Your Address</h3>
                        <textarea
                            className="w-full h-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter your delivery address..."
                            value={useraddress}
                            onChange={(e) => setuserAddress(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="px-4 py-2 border border-solid border-gray-500 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                                onClick={() => setShowAddressForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 border border-solid rounded-full ${
                                    isProcessing
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                onClick={handlePayment}
                                disabled={isProcessing} // Disable button during processing
                            >
                                {isProcessing ? "Processing..." : "Submit & Pay"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center space-x-4">
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
                                    setShowAddressForm(true);
                                } else {
                                    setShowSignInModal(true);
                                }
                            }}
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return null; // Return nothing if there are no cart items
};

export default CartActions;
