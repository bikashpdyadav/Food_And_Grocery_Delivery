import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (itemIndex !== -1) {
                // If item exists, increment the quantity
                state.items[itemIndex].quantity += 1;
            } else {
                // If item does not exist, add it with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (itemIndex !== -1) {
                // If quantity is greater than 1, decrement it
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    // If quantity is 1 or less, remove the item from the cart
                    state.items.splice(itemIndex, 1);
                }
            }
        },
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        },
    }
});

export const { addItem, removeItem, setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
