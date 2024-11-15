import React from "react";
import { LOGO_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Header from '../Header';
import Contact from '../Contact';

const FoodAbout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    About Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Section - Text */}
                    <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Our Story
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Welcome to GrocerEase, your trusted partner for convenient and reliable grocery shopping. Established in 2020, our mission has been to simplify the way you shop for groceries, providing a seamless experience from your device to your doorstep.
                        </p>
                        <p className="text-gray-600 mb-6">
                            With GrocerEase, you can discover a wide range of fresh produce, pantry staples, and household essentials. Our platform connects you to your favorite local stores and suppliers, ensuring you always get the highest quality products.
                        </p>
                        <p className="text-gray-600">
                            We are committed to supporting local vendors and making grocery shopping easy and accessible for everyone.
                        </p>
                    </div>
                    {/* Right Section - Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={LOGO_URL}
                            alt="About us"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Mission and Vision Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Our Mission
                        </h3>
                        <p className="text-gray-600">
                            At GrocerEase, our mission is to make everyday grocery shopping a breeze. We aim to deliver top-quality products promptly, ensuring a smooth and enjoyable experience for our customers.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Our Vision
                        </h3>
                        <p className="text-gray-600">
                            We envision a world where everyone has access to fresh, high-quality groceries without leaving their home. Our goal is to create a community of satisfied shoppers and thriving local businesses supported by our innovative platform.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Want to learn more?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Browse our catalog, discover new items, and enjoy fast, reliable delivery!
                    </p>
                    <button className="bg-green-400 py-2 px-6 rounded-lg shadow-md hover:bg-green-600" onClick={() => navigate('/grocery')}>
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
      <Contact />
    </div>
  );
};

export default FoodAbout;