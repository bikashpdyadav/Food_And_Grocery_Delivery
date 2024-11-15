import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationOptions = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome to Our Services</h1>
                <p className="text-lg font-semibold text-gray-600 mb-12 text-center">
                    Explore our offerings and find what suits your needs. From delicious food delivery to essential grocery shopping, we’ve got you covered.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                    {/* Food Card */}
                    <div
                        onClick={() => navigate('/food')}
                        className="cursor-pointer bg-pink-200 hover:bg-pink-300 transition duration-300 transform hover:scale-105 rounded-xl shadow-lg p-8 flex flex-col items-center w-64"
                    >
                        <h2 className="text-2xl font-bold text-pink-800 mb-4">Food</h2>
                        <div className="w-24 h-24 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                            <span role="img" aria-label="food" className="text-4xl">🍔</span>
                        </div>
                        <p className="text-sm text-pink-700 text-center">
                            Enjoy a wide variety of delicious meals delivered to your doorstep. Satisfy your cravings with ease.
                        </p>
                    </div>

                    {/* Grocery Card */}
                    <div
                        onClick={() => navigate('/grocery')}
                        className="cursor-pointer bg-green-200 hover:bg-green-300 transition duration-300 transform hover:scale-105 rounded-xl shadow-lg p-8 flex flex-col items-center w-64"
                    >
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Grocery</h2>
                        <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mb-4">
                            <span role="img" aria-label="grocery" className="text-4xl">🛒</span>
                        </div>
                        <p className="text-sm text-green-700 text-center">
                            Get fresh groceries delivered to your home, making shopping simple and convenient.
                        </p>
                    </div>
                </div>
                <p className="text-lg font-semibold text-gray-600 mt-12 text-center">
                    Welcome to a Seamless Experience! Explore our platform for both food delivery and grocery shopping, all in one convenient place. Navigate easily between delicious meal options and essential household items. Whether you're looking to satisfy your hunger or stock up on groceries, we've got everything covered to make your day easier and more efficient.
                </p>
            </div>
        </div>
    )
}

export default NavigationOptions;