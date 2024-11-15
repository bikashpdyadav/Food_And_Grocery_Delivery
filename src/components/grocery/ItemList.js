import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemList = ({ items, src }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    // Get cart state to show the item quantity
    const cartItems = useSelector((state) => state.cart.items);

    const userId = user?.uid;
    const handleAddItem = (item) => {
        dispatch(addItem(item));
        toast("Item Added to Cart!");
        // Update local storage with the updated cart
        const updatedCart = [...cartItems, { ...item, quantity: getItemQuantity(item?.card?.info?.id) + 1 }];
        if (userId) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart)); // Update cart in localStorage
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        toast("Item Removed from Cart!");
        // Remove the item from local storage as well
        const updatedCart = cartItems.filter(cartItem => cartItem.card.info.id !== item.card.info.id);
        if (userId) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart)); // Update cart in localStorage
        }
    };

    // Get the quantity of the item in the cart
    const getItemQuantity = (itemId) => {
        const cartItem = cartItems.find(i => i.card.info.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div>
            {items.map((item) => (
                <div
                    key={item?.card?.info?.id}
                    className="m-2 p-2 border-b-2 border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                    <div className="py-2 w-full sm:w-2/3 pr-4"> {/* Set width for text and add padding-right */}
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{item?.card?.info?.name}</span>
                            <span>
                                ₹
                                {item?.card?.info?.price
                                    ? item?.card?.info?.price / 100
                                    : item?.card?.info?.defaultPrice / 100}
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{item?.card?.info?.description}</p>
                    </div>
                    <div className="w-full sm:w-1/3 flex flex-col items-center mt-4 sm:mt-0"> {/* Set width for image */}
                        <div className="relative w-32 h-24">
                            <img
                                className="w-full h-full object-cover rounded"
                                src={CDN_URL + item?.card?.info?.imageId}
                                alt={item?.card?.info?.name}
                            />
                        </div>
                        <div className="flex justify-center items-center mt-2"> {/* Place buttons below image */}
                            <button
                                className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                                onClick={() => handleRemoveItem(item)}
                            >
                                -
                            </button>
                            <span className="mx-2 text-lg">{getItemQuantity(item?.card?.info?.id)}</span> {/* Display quantity */}
                            <button
                                className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                                onClick={() => handleAddItem(item)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default ItemList;
