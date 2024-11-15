import { useEffect, useState } from "react";
import Header from "../Header";
import Contact from "../Contact";
import { addItem, removeItem } from '../utils/groceryCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GROCERY_API } from '../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FoodBody = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.groceryCart.items);
  const IMG_URL = 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_294/';
  const [groceryList, setgroceryList] = useState([]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(GROCERY_API);
      const json = await response.json();
      setgroceryList(json?.data?.categories);
    }
    fetchData();
  }, []);

  console.log(groceryList)
  const handleAddItem = (item) => {
    dispatch(addItem(item));
    toast("Item Added to Cart!");
    // // Update local storage with the updated cart
    // const updatedCart = [...cartItems, { ...item, quantity: getItemQuantity(item?.card?.info?.id) + 1 }];
    // if (user.uid) {
    //   localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart)); // Update cart in localStorage
    // }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
    toast("Item Removed from Cart!");
    // // Remove the item from local storage as well
    // const updatedCart = cartItems.filter(cartItem => cartItem.card.info.id !== item.card.info.id);
    // if (user.uid) {
    //   localStorage.setItem(`cart_${user.uid}`, JSON.stringify(updatedCart)); // Update cart in localStorage
    // }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className='p-4 flex flex-wrap flex-grow justify-center gap-4'>
        {groceryList.map((grocery, index) => (
          <div key={index} className="m-2 flex-grow max-w-xs">
            <div className="flex flex-col items-center p-2">
              <img className="w-3/4 h-auto" src={IMG_URL + grocery.imageId} alt={grocery.displayName} />
              <div className="flex justify-center items-center mt-2"> { }
                <button
                  className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                  onClick={() => handleRemoveItem(grocery)}
                >
                  -
                </button>
                {/* <span className="mx-2 text-lg">{getItemQuantity(item?.card?.info?.id)}</span> {} */}
                <button
                  className="bg-black text-white py-1 px-3 mx-1 shadow-lg rounded-lg"
                  onClick={() => handleAddItem(grocery)}
                >
                  +
                </button>
              </div>
              <h1 className="mt-3 text-center">{grocery.displayName}</h1>
            </div>
          </div>
        ))}
      </div>
      <Contact />
    </div>
  );
};

export default FoodBody;
