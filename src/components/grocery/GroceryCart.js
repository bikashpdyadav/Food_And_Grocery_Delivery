import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCartItems } from "../utils/groceryCartSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGO_URL } from '../utils/constants';
import Header from '../Header';
import Contact from '../Contact';
import ItemList from "./ItemList";
import ConfirmationModal from '../ConfirmationModal';
import SignInFirst from '../SignInFirst';
import CartActions from '../CartActions';
import CartSummary from '../CartSummary';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItem, removeItem } from '../utils/groceryCartSlice';

const GroceryCart = () => {
    const cartItems = useSelector((store) => store.groceryCart.items);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showClearCartModal, setShowClearCartModal] = useState(false);

    const IMG_URL = 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/';

    //console.log(cartItems);
    // Function to load Razorpay script
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    // Display Razorpay payment modal
    async function displayRazorpay() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("https://food-delivery-app-payment.onrender.com/payment/orders", { totalAmount });
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: process.env.DASHBOARD_KEY_ID,
            amount: amount.toString(),
            currency,
            name: "Food_Delivery_App",
            description: "Test Transaction",
            image: LOGO_URL,
            order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(
                    "https://food-delivery-app-payment.onrender.com/payment/success",
                    data
                );

                if (result.status === 200) {
                    dispatch(clearCart());
                    localStorage.removeItem(`cart_${user.uid}`);
                    navigate('/success', { state: { amount: totalAmount / 100, id: order_id } });
                }
            },
            prefill: {
                name: "Food_Delivery_App",
                email: "team@food_delivery_app.com",
                contact: "9999999999",
            },
            notes: {
                address: "BDA, AMBEDKAR INSTITUTE OF TECHNOLOGY, Outer Ring Rd, Near Gnana Bharati, 2nd Stage, Nagarbhavi, Bengaluru, Karnataka, 560056",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    // Load cart from localStorage on component mount
    useEffect(() => {
        if (user) {
            const savedCart = localStorage.getItem(`cart_${user.uid}`);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                dispatch(setCartItems(parsedCart));
            }
        }
    }, [user, dispatch]);

    // Calculate total price
    // useEffect(() => {
    //     const calculateTotal = () => {
    //         return cartItems.reduce(
    //             (acc, item) => acc + (item.card.info.defaultPrice ? item.card.info.defaultPrice : item.card.info.price) * item.quantity,
    //             0
    //         );
    //     };
    //     setTotalAmount(calculateTotal());
    // }, [cartItems]);

    const handleClearCart = () => {
        dispatch(clearCart());
        if (user) localStorage.removeItem(`cart_${user.uid}`);
        setShowClearCartModal(false);
    };

    const handleAddItem = (item) => {
        dispatch(addItem(item));
        toast("Item Added to Cart!");
        // // Update local storage with the updated cart
        // const updatedCart = [...cartItems, { ...item, quantity: getItemQuantity(item?.card?.info?.id) + 1 }];
        // if (user.uid) {
        //   localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart)); // Update cart in localStorage
        // }
      };
    
      const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast("Item Removed from Cart!");
        // // Remove the item from local storage as well
        // const updatedCart = cartItems.filter(cartItem => cartItem.card.info.id !== item.card.info.id);
        // if (user.uid) {
        //   localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart)); // Update cart in localStorage
        // }
      };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow relative text-center m-4 p-4">
                <h1 className="text-2xl font-bold mb-4 md:text-3xl">Cart</h1>
                <div className="w-full max-w-4xl mx-auto my-8 p-6 border border-solid border-gray-200 rounded-lg bg-white shadow-lg">
                    {/* <ItemList items={cartItems} src={"cart"} className="space-y-4" /> */}
                    {cartItems.map((grocery,index) => (
                        <div key={index} className="m-2 flex-grow max-w-xs">
                        <div className="flex flex-col items-center p-2">
                          <img className="w-3/4 h-auto" src={IMG_URL + grocery.imageId} alt={grocery.displayName} />
                          <div className="flex justify-center items-center mt-2"> { }
                            <button
                              className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                              onClick={() => handleRemoveItem(grocery)}
                            >
                              -
                            </button>
                            {/* <span className="mx-2 text-lg">{getItemQuantity(item?.card?.info?.id)}</span> {} */}
                            <button
                              className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                              onClick={() => handleAddItem(grocery)}
                            >
                              +
                            </button>
                          </div>
                          <h1 className="mt-3 text-center">{grocery.displayName}</h1>
                        </div>
                      </div>
                    ))}
                    <CartSummary cartItems={cartItems} totalAmount={totalAmount} navigate={navigate} />
                    <CartActions
                        cartItems={cartItems}
                        user={user}
                        setShowSignInModal={setShowSignInModal}
                        setShowClearCartModal={setShowClearCartModal}
                        displayRazorpay={displayRazorpay}
                    />
                </div>
                {showSignInModal && <SignInFirst onCancel={() => setShowSignInModal(false)} />}
                {showClearCartModal && (
                    <ConfirmationModal
                        onConfirm={handleClearCart}
                        onCancel={() => setShowClearCartModal(false)}
                    />
                )}
            </div>
            <Contact />
        </div>
    );
};

export default GroceryCart;
