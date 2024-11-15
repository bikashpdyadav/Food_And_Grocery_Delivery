import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";  // Add the user slice
import groceryCartReducer from "./groceryCartSlice";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        groceryCart: groceryCartReducer,
        user: userReducer,  // Add the user reducer
    },
});

export default appStore;