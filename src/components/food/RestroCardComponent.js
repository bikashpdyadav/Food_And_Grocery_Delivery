import { CDN_URL } from "../utils/constants";

const RestroCardComponent = ({ resObj }) => {
    if (!resObj) return <div>Loading...</div>;

    const {
        name,
        cuisines,
        avgRating,
        cloudinaryImageId
    } = resObj?.info;
    const deliveryTime = resObj?.info?.sla?.deliveryTime;

    return (
        <div>
            {/* Card for small screens (shows full content) */}
            <div className="block sm:hidden group relative m-2 p-4 w-full bg-gray-200 rounded-lg shadow-md">
                <img
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    alt="Restaurant Logo"
                    src={CDN_URL + cloudinaryImageId}
                />
                <div className="h-auto">
                    <h3 className="text-lg font-bold mb-2">{name}</h3>
                    <p className="text-sm text-gray-700 mb-1">
                        {cuisines.join(", ")}
                    </p>
                    <p className="text-sm text-gray-700">{avgRating} 🌟</p>
                    <p className="text-sm text-gray-700">{deliveryTime} minutes</p>
                </div>
            </div>

            {/* Card for medium and large screens (original hover functionality) */}
            <div className="hidden sm:block group relative m-2 sm:m-4 p-4 w-full sm:w-64 bg-gray-200 rounded-lg shadow-md transition-transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg duration-300">
                <img
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4 group-hover:bg-gray-300 transition-colors"
                    alt="Restaurant Logo"
                    src={CDN_URL + cloudinaryImageId}
                />
                <div className="h-24 sm:h-28 overflow-hidden relative group-hover:h-auto">
                    <h3 className="text-lg font-bold mb-2 truncate">{name}</h3>
                    <p className="text-sm text-gray-700 mb-1 truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:max-h-full">
                        {cuisines.join(", ")}
                    </p>

                    <p className="text-sm text-gray-700 hidden group-hover:block">{avgRating} 🌟</p>
                    <p className="text-sm text-gray-700 hidden group-hover:block">{deliveryTime} minutes</p>
                    <span className="absolute text-xs bottom-0 left-0 text-gray-600 cursor-pointer group-hover:hidden">Read More...</span>
                </div>
            </div>
        </div>

    );
};

export default RestroCardComponent;
