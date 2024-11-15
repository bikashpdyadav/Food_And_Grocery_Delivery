import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
 
const SignInFirst = ({ onCancel }) => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl shadow-black max-w-sm w-full z-50">
                <h1 className="text-2xl font-bold mb-4">Please sign in first</h1>
                <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-blue-600 text-white text-lg rounded mb-2 w-full hover:bg-blue-700"
                >
                    Sign In
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-black text-lg rounded w-full hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SignInFirst;