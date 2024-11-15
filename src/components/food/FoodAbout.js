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
                Welcome to Foodie's Delight, where we believe that good food brings
                people together. Founded in 2020, we started with the goal of
                connecting food lovers with the best local restaurants and home
                chefs in their area.
              </p>
              <p className="text-gray-600 mb-6">
                Our app makes it easy for you to discover new cuisines, explore
                local favorites, and have your meals delivered right to your
                doorstep. Whether you’re craving a hearty meal or just a light
                snack, we’ve got you covered!
              </p>
              <p className="text-gray-600">
                We take pride in supporting local businesses and ensuring you
                receive fresh, high-quality food with every order.
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
                At Foodie's Delight, our mission is to bring delicious meals to
                your table while making the ordering experience simple, enjoyable,
                and efficient. We aim to be your go-to platform for discovering
                the best food your city has to offer.
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                We envision a world where quality food is accessible to everyone,
                and local restaurants thrive in a community of food enthusiasts.
                We’re committed to expanding our reach, supporting more
                businesses, and improving our technology to give you the best
                service possible.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Want to know more?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our menu, connect with your favorite restaurants, and enjoy
              great food delivered to your door!
            </p>
            <button className="bg-green-400 py-2 px-6 rounded-lg shadow-md hover:bg-green-600" onClick={() => navigate('/')}>
              Start Ordering
            </button>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default FoodAbout;