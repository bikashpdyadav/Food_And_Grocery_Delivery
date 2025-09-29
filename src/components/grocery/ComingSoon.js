import React from "react";
import Header from "../Header";
import Contact from "../Contact";

const ComingSoon = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-6xl">🛒</span>
            </div>
          </div>

          {/* Coming Soon Title */}
          <h1 className="text-5xl font-bold text-green-800 mb-6">
            Coming Soon
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-green-700 mb-8 font-semibold">
            Grocery Shopping Made Easy
          </p>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We're working hard to bring you the best grocery shopping experience. 
              Our team is putting the finishing touches on a platform that will make 
              your grocery shopping effortless and convenient.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🥬</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Fresh Produce</h3>
                <p className="text-sm text-gray-600 text-center">Farm-fresh vegetables and fruits</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Home Delivery</h3>
                <p className="text-sm text-gray-600 text-center">Fast and reliable delivery to your doorstep</p>
              </div>
              
              <div className="flex flex-col items-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Best Prices</h3>
                <p className="text-sm text-gray-600 text-center">Competitive prices on all items</p>
              </div>
            </div>

            {/* Features List */}
            <div className="text-left">
              <h4 className="text-xl font-semibold text-green-800 mb-4 text-center">
                What to Expect:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Wide variety of grocery categories</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Smart search and filters</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Real-time inventory updates</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Secure payment options</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Order tracking and notifications</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Loyalty rewards program</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-green-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
            <p className="text-lg mb-6">
              Be the first to know when we launch. Get exclusive early access and special offers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300 shadow-lg">
                Notify Me
              </button>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-8 text-green-600">
            <p className="text-lg">
              Thank you for your patience. We can't wait to serve you! 🚀
            </p>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ComingSoon;
