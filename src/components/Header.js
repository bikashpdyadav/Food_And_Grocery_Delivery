import { LOGO_URL } from "../components/utils/constants";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";
import MobileMenu from "./MobileMenu";
import ScrollToTopButton from "./ScrollToTopButton";

const Header = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const user = useSelector((store) => store.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthPage = location.pathname === '/login';
    const isFoodSection = location.pathname.startsWith('/food');

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleButtonClick = () => {
        if (!user) navigate('/login');
    };

    const scrollToFooter = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className={`flex flex-wrap justify-between items-center shadow-lg p-4 ${isFoodSection ? 'bg-pink-100' : 'bg-green-100'
                }`}
        >
            <img className="w-20 sm:w-28" src={LOGO_URL} alt="Logo" />
            {!isAuthPage && (
                <div>
                    {/* Desktop Menu */}
                    <MenuButton
                        cartItems={cartItems}
                        user={user}
                        navigate={navigate}
                        handleButtonClick={handleButtonClick}
                        scrollToFooter={scrollToFooter}
                    />

                    {/* Mobile Menu */}
                    <MobileMenu
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        cartItems={cartItems}
                        user={user}
                        navigate={navigate}
                        scrollToFooter={scrollToFooter}
                    />

                    {showScrollTop && <ScrollToTopButton />}
                </div>
            )}
        </div>
    );
};

export default Header;
