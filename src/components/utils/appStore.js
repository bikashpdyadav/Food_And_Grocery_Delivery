import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice"; 
import groceryCartReducer from "./groceryCartSlice";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
        groceryCart: groceryCartReducer,
        user: userReducer,
    },
});

export default appStore;