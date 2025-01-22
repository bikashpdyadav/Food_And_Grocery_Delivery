import { useRef, useEffect } from "react";
import DisplayUserCard from './DisplayUserCard';
import { useLocation } from "react-router-dom";

const MobileMenu = ({ isDropdownOpen, toggleDropdown, cartItems, user, navigate, scrollToFooter }) => {
    const dropdownRef = useRef(null);
    const location = useLocation();
    const isFoodSection = location.pathname.startsWith('/food');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                toggleDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleDropdown]);

    return (
        <div className="relative lg:hidden flex">
            <button className="font-bold px-3 py-2" onClick={toggleDropdown}>
                Menu
            </button>
            <button className="font-bold px-3 py-2 cursor-pointer" onClick={() => { navigate("/login"); toggleDropdown(false); }}>
                {user ? <DisplayUserCard /> : "Sign In"}
            </button>
            {isDropdownOpen && (
                <ul ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                    <li 
                        className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={() => { navigate("/"); toggleDropdown(false); }}>
                        Home
                    </li>
                    <li 
                        className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={() => { navigate("/food"); toggleDropdown(false); }}>
                        Food
                    </li>
                    <li 
                        className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={() => { navigate("/grocery"); toggleDropdown(false); }}>
                        Grocery
                    </li>
                    <li 
                        className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={() => { isFoodSection ? navigate("/food/about"):navigate("/grocery/about"); toggleDropdown(false); }}>
                        About Us
                    </li>
                    <li className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" onClick={() => { scrollToFooter(); toggleDropdown(false); }}>
                        Contact Us
                    </li>
                    <li 
                        className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={() => { navigate("/orderhistory"); toggleDropdown(false); }}>
                        Order Details
                    </li>
                    <li className="block px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer" onClick={() => { isFoodSection ? navigate("/food/cart"):navigate("/grocery/cart"); toggleDropdown(false); }}>
                        Cart ({cartItems.length})
                    </li>
                </ul>
            )}
        </div>
    );
};

export default MobileMenu;
