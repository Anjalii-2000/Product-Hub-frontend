import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {

            const itemExist = state.cartItems.find(
                item => item._id === action.payload._id
            );

            if (itemExist) {
                itemExist.quantity += 1;
            } 
            else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                item => item._id !== action.payload
            );
        },

        increaseQuantity: (state, action) => {

            const item = state.cartItems.find(
                item => item._id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {

            const item = state.cartItems.find(
                item => item._id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;