import { useLocation } from "react-router-dom";

const ScrollToTopButton = () => {
    const location = useLocation();
    const isFoodSection = location.pathname.startsWith('/food');
    
    return (
        <button
            aria-label="Scroll to top"
            className={`fixed bottom-8 right-8 p-4 text-black ${
                isFoodSection ? 'bg-pink-200 hover:bg-pink-300' : 'bg-green-200 hover:bg-green-300'
            } rounded-[100%] shadow-md transition-colors z-50`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            ↑
        </button>
    );
};

export default ScrollToTopButton;
