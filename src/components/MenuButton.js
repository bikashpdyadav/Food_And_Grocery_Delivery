import { useLocation } from 'react-router-dom';
import DisplayUserCard from './DisplayUserCard';

const MenuButton = ({ cartItems, user, navigate, handleButtonClick, scrollToFooter }) => {
    const location = useLocation();
    const isFoodSection = location.pathname.startsWith('/food');

    return (
        <ul className="hidden lg:flex text-xl md:text-2xl lg:text-3xl">
            <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
                Home
            </li>
            <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/food")}>
                Food
            </li>
            <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/grocery")}>
                Grocery
            </li>
            <li
                className="px-2 sm:px-4 font-bold text-lg cursor-pointer"
                onClick={() => isFoodSection ? navigate("/food/about") : navigate("/grocery/about")}>
                About Us
            </li>
            <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={scrollToFooter}>
                Contact Us
            </li>
            <li className="px-2 sm:px-4 font-bold text-lg cursor-pointer" onClick={() => navigate("/orderhistory")}>
                Order Details
            </li>
            <li
                className="px-2 sm:px-4 font-bold text-lg cursor-pointer"
                onClick={() => isFoodSection ? navigate("/food/cart") : navigate("/grocery/cart")}>
                Cart ({cartItems.length})
            </li>
            <li className="px-2 sm:px-4 font-bold text-lg">
                <button onClick={handleButtonClick}>
                    {user ? <DisplayUserCard /> : "Sign In"}
                </button>
            </li>
        </ul>
    )
};

export default MenuButton;
