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
                <div className="flex-1 p-6 max-w-6xl mx-auto">

                    <h1 className="text-3xl font-bold mb-6">
                        My Cart
                    </h1>

                    {cartItems.length === 0 ? (

                        <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
                            Your cart is empty
                        </p>

                    ) : (

                        cartItems.map((item) => (

                            <div
                                key={item._id}
                                className="flex items-center gap-5 border p-4 rounded mb-4 bg-white shadow"
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

                    )}

                </div>

            </div>

        </div>
    );
}

export default CustomerCart;