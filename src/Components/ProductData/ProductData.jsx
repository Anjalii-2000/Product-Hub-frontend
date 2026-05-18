import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";

const BASE_URL = "http://localhost:3000";

const ProductData = ({
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

    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [pendingId, setPendingId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                await axios.get(
                    `${BASE_URL}/api/me`,
                    { withCredentials: true }
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

            setPendingId(product._id);
            setShowAuthPopup(true);
            return;

        }

        dispatch(addToCart(product));

    };

    const handleDecrease = (e, productId) => {

        e.preventDefault();
        e.stopPropagation();

        dispatch(
            decreaseQuantity(productId)
        );

    };

    const handleLogin = () => {

        setShowAuthPopup(false);
        navigate("/login");

    };

    const handleRegister = () => {

        setShowAuthPopup(false);
        navigate("/register");

    };

    const continueAfterLogin = () => {

        setShowAuthPopup(false);

        if (pendingId) {

            toggleWishlist &&
                toggleWishlist(pendingId);

            setPendingId(null);

        }

    };

    const handleBuyNow = (e, product) => {

        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn === null) {

            toast.info("Checking login...");
            return;

        }

        if (!isLoggedIn) {

            setPendingId(product._id);
            setShowAuthPopup(true);
            return;

        }

        dispatch(addToCart(product));

        navigate("/checkout");

    };

    if (loading)
        return (
            <p className="text-center mt-20 text-lg font-semibold w-full">
                Loading...
            </p>
        );

    if (error)
        return (
            <p className="text-center mt-20 text-red-500 text-lg font-semibold w-full">
                Error fetching products
            </p>
        );

    if (products.length === 0)
        return (
            <p className="text-center mt-20 text-gray-500 text-lg font-semibold w-full">
                No products found
            </p>
        );

    return (
        <>
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {products.map((item) => {

                    const cartItem = cartItems.find(
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
                                className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
                            >

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(item._id);
                                    }}
                                    className="absolute top-3 right-3 text-2xl z-10"
                                >
                                    {wishlist.includes(item._id)
                                        ? "❤️"
                                        : "🤍"}
                                </button>

                                <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 flex justify-center items-center h-52 overflow-hidden">

                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="h-full object-contain"
                                    />

                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">

                                    <div>

                                        <h2 className="text-lg font-semibold text-gray-900">

                                            {item.productName}

                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">

                                            {item.description}

                                        </p>

                                        <div className="flex justify-between items-center mt-3">

                                            <span className="text-xl font-bold text-indigo-600">

                                                ₹{item.price}

                                            </span>

                                            <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">

                                                {item.category}

                                            </span>

                                        </div>

                                    </div>

                                    <div className="mt-4 flex gap-3">

                                        {!cartItem ? (

                                            <button
                                                onClick={(e) =>
                                                    handleAddToCart(e, item)
                                                }
                                                className="flex-1 bg-black text-white px-6 py-2 rounded-full"
                                            >
                                                Add To Cart
                                            </button>

                                        ) : (

                                            <div className="flex items-center gap-2">

                                                <button
                                                    onClick={(e) =>
                                                        handleDecrease(
                                                            e,
                                                            item._id
                                                        )
                                                    }
                                                    className="bg-white text-black px-3 py-2 rounded"
                                                >
                                                    -
                                                </button>

                                                <span className="px-3 text-black">

                                                    {cartItem.quantity}

                                                </span>

                                                <button
                                                    onClick={(e) =>
                                                        handleAddToCart(
                                                            e,
                                                            item
                                                        )
                                                    }
                                                    className="bg-white text-black px-3 py-2 rounded"
                                                >
                                                    +
                                                </button>

                                            </div>

                                        )}

                                        <button
                                            onClick={(e) =>
                                                handleBuyNow(e, item)
                                            }
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
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

            <LoginModal
                open={showAuthPopup}
                onClose={() => setShowAuthPopup(false)}
                onLoginClick={() => {
                    setShowAuthPopup(false);
                    navigate("/login");
                }}
                onRegisterClick={() => {
                    setShowAuthPopup(false);
                    navigate("/register");
                }}
            />

        </>
    );
};

export default ProductData;