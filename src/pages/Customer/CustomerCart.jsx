import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CustomerHeader from "../../Components/Customer/CustomerHeader/CustomerHeader";
import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function CustomerCart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(
        (state) => state.cart
    );

    const [user, setUser] = useState(null);

    // Fetch logged in user
    useEffect(() => {

        const fetchUser = async () => {

            try {

                const res = await axios.get(
                    `${BASE_URL}/api/me`,
                    {
                        withCredentials: true
                    }
                );

                setUser(res.data.user);

            } catch (error) {

                setUser(null);

            }
        };

        fetchUser();

    }, []);

    const customerName =
        user?.firstName || "Customer";



    const handleLogout = async () => {

        try {

            await axios.post(
                `${BASE_URL}/api/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            navigate("/login");

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <CustomerHeader
                customerName={customerName}
                handleLogout={handleLogout}
            />

            {/* Main section */}
            <div className="pt-20 flex">

                {/* Cart Content */}
                <div className="flex-1 p-4 md:p-6 max-w-6xl mx-auto">

                    <h1 className="text-2xl md:text-3xl font-semibold mb-6">
                        My Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <p className="text-center mt-20 text-gray-500 text-base font-medium">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="space-y-4">

                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col sm:flex-row items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white"
                                >

                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex items-center justify-center border rounded bg-white">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h2 className="font-medium text-gray-900 text-sm md:text-base">
                                            {item.productName}
                                        </h2>

                                        <p className="text-gray-700 mt-1 text-sm">
                                            ₹{item.price}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border rounded-md overflow-hidden">
                                        <button
                                            onClick={() => dispatch(decreaseQuantity(item._id))}
                                            className="px-3 py-1 text-gray-700"
                                        >
                                            -
                                        </button>

                                        <span className="px-3 text-sm text-gray-900">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => dispatch(increaseQuantity(item._id))}
                                            className="px-3 py-1 text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition text-sm"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default CustomerCart;