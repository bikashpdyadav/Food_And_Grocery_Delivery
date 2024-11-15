import { LOGO_URL } from "./utils/constants";
import { useLocation } from "react-router-dom";

const Contact = () => {
    const location = useLocation();
    const isFoodSection = location.pathname.startsWith('/food');

    return (
        <div className={`flex flex-col md:flex-row justify-between items-center md:items-center p-6 md:p-8 text-black ${isFoodSection ? 'bg-pink-100' : 'bg-green-100'}`}>
            {/* Contact Us Section */}
            <div className="flex flex-col items-center md:items-start md:w-1/2 mb-4 md:mb-0">
                <p className='p-1 font-semibold text-center md:text-left'>Contact Us</p>
                <p className="ml-0 text-center md:text-left">+91 9999999999</p>
                <p className="ml-0 text-center md:text-left">team@food_delivery_app.com</p>
                <p className='p-1 font-semibold text-center md:text-left'>Customer Support Available</p>
                <p className='p-1 text-center md:text-left'>Available 24hr</p>
                <p className='p-1 font-semibold text-center md:text-left'>Find Us Here</p>
                <div className="flex gap-2 p-1 justify-center md:justify-start">
                    <img src="https://th.bing.com/th?id=OIP.NUFU5mhqhqOr82Ge-CwjawHaHv&w=244&h=255&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" alt="Instagram" className="w-6 h-6" />
                    <img src="https://th.bing.com/th?id=OIP.biG9UdrkNGTbvX1YvOvY4AHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" alt="Twitter" className="w-6 h-6" />
                    <img src="https://th.bing.com/th?id=OIP.6uTQ7mOjYOD2sNKxUdnaNAHaHa&w=250&h=250&c=8&rs=1&qlt=90&r=0&o=6&pid=3.1&rm=2" alt="LinkedIn" className="w-6 h-6" />
                    <img src="https://th.bing.com/th?id=OIP.cOz92GK9w_2_VxUIWBL0ngHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="Facebook" className="w-6 h-6" />
                </div>
            </div>

            {/* Logo and Address Section */}
            <div className='flex flex-col items-center md:items-start md:w-1/2'>
                <img src={LOGO_URL} alt="Food Delivery App Logo" className='w-1/4 mb-4 md:mb-0' />
                <p className='font-semibold text-center md:text-left'>Regd. Address</p>
                <p className="leading-relaxed text-center md:text-left">
                    BDA, AMBEDKAR INSTITUTE OF TECHNOLOGY, Outer Ring Rd, Near Gnana Bharati, 2<sup>nd</sup> Stage, Nagarbhavi, Bengaluru, Karnataka, 560056
                </p>
            </div>
        </div>
    );
};

export default Contact;
