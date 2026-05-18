import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../../features/cart/cartSlice";

const BASE_URL = "http://localhost:3000";

const CustomerProduct = ({
    products = [],
    loading,
    error,
    wishlist = [],
    toggleWishlist
}) => {

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const { cartItems } = useSelector(
        (state) => state.cart
    );

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                await axios.get(
                    `${BASE_URL}/api/me`,
                    {
                        withCredentials: true
                    }
                );

                setIsLoggedIn(true);

            } catch {

                setIsLoggedIn(false);

            }

        };

        checkAuth();

    }, []);

    const handleAddToCart = (e, product) => {

        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn === null) {

            toast.info("Checking login...");
            return;

        }

        if (!isLoggedIn) {

            toast.warning(
                "Please login first"
            );

            navigate("/login");
            return;

        }

        dispatch(
            addToCart(product)
        );

    };

    const handleDecrease = (
        e,
        productId
    ) => {

        e.preventDefault();
        e.stopPropagation();

        dispatch(
            decreaseQuantity(productId)
        );

    };

    const handleBuyNow = (
        e,
        product
    ) => {

        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn === null) {

            toast.info(
                "Checking login..."
            );

            return;

        }

        if (!isLoggedIn) {

            toast.warning(
                "Please login first"
            );

            navigate("/login");

            return;

        }

        dispatch(
            addToCart(product)
        );

        navigate("/checkout");

    };

    if (loading)
        return (
            <p className="text-center mt-20 text-lg font-semibold">
                Loading...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-20 text-red-500 text-lg font-semibold">
                Error fetching products
            </p>
        );

    if (products.length === 0)
        return (
            <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
                No products found
            </p>
        );

    return (

        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            {products.map((item) => {

                const cartItem =
                    cartItems.find(
                        product =>
                            String(product._id) ===
                            String(item._id)
                    );

                return (

                    <div
                        key={item._id}
                        className="flex flex-col h-full"
                    >

                        <Link
                            to={`/product/${item._id}`}
                            className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden border"
                        >

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleWishlist(
                                        item._id
                                    );
                                }}
                                className="absolute top-3 right-3 text-2xl z-10"
                            >
                                {wishlist.includes(
                                    item._id
                                )
                                    ? "❤️"
                                    : "🤍"}
                            </button>

                            <div className="bg-gray-100 p-3 flex justify-center items-center h-40">

                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="h-full object-contain"
                                />

                            </div>

                            <div className="p-4 flex-1">

                                <h2 className="font-semibold">

                                    {item.productName}

                                </h2>

                                <p className="text-sm text-gray-500">

                                    {item.description}

                                </p>

                                <div className="flex justify-between mt-3">

                                    <span className="font-bold text-indigo-600">

                                        ₹{item.price}

                                    </span>

                                    <span className="text-xs bg-indigo-100 px-2 py-1 rounded">

                                        {item.category}

                                    </span>

                                </div>

                                <div className="mt-4 flex gap-2">

                                    <div className="flex-1">

                                        {!cartItem ? (

                                            <button
                                                onClick={(e) =>
                                                    handleAddToCart(e, item)
                                                }
                                                className="w-full bg-black text-white py-2 rounded-full text-sm"
                                            >
                                                Add To Cart
                                            </button>

                                        ) : (

                                            <div className="w-full h-[40px] border rounded-full flex justify-center items-center gap-4">

                                                <button
                                                    onClick={(e) =>
                                                        handleDecrease(
                                                            e,
                                                            item._id
                                                        )
                                                    }
                                                    className="font-bold px-2"
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {cartItem.quantity}
                                                </span>

                                                <button
                                                    onClick={(e) =>
                                                        handleAddToCart(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    className="font-bold px-2"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                    <button
                                        onClick={(e) =>
                                            handleBuyNow(
                                                e,
                                                item
                                            )
                                        }
                                        className="flex-1 bg-blue-500 text-white py-2 rounded-full text-sm"
                                    >
                                        Buy Now
                                    </button>

                                </div>

                            </div>

                        </Link>

                    </div>

                );

            })}

        </div>
    );
};

export default CustomerProduct;