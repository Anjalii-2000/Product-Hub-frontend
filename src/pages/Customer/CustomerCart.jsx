import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../features/cart/cartSlice";

function CustomerCart() {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(
        state => state.cart
    );
    return (
        <div className="max-w-6xl mx-auto p-5">

            <h1 className="text-3xl font-bold mb-6">
                My Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <h2>Your cart is empty</h2>

                ) : (

                    cartItems.map(item => (

                        <div
                            key={item._id}
                            className="flex items-center gap-5 border p-4 rounded mb-4"
                        >

                            <img
                                src={item.image}
                                alt={item.productName}
                                className="w-24 h-24 object-contain"
                            />

                            <div className="flex-1">

                                <h2 className="font-bold">
                                    {item.productName}
                                </h2>

                                <p>
                                    ₹{item.price}
                                </p>

                            </div>

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() =>
                                        dispatch(
                                            decreaseQuantity(item._id)
                                        )
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        dispatch(
                                            increaseQuantity(item._id)
                                        )
                                    }
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                onClick={() =>
                                    dispatch(
                                        removeFromCart(item._id)
                                    )
                                }
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                Remove
                            </button>

                        </div>

                    ))

                )

            }

        </div>
    )
}

export default CustomerCart;