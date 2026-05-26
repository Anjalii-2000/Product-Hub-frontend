import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { addToCart, decreaseQuantity } from "../../../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../features/wishlist/wishlistSlice";

const BASE_URL = "http://localhost:3000";

const CustomerProduct = ({
    products = [],
    loading,
    error
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`${BASE_URL}/api/me`, {
                    withCredentials: true
                });
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
            toast.warning("Please login first");
            navigate("/login");
            return;
        }

        dispatch(addToCart(product));
    };

    const handleDecrease = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(decreaseQuantity(productId));
    };
    const stripePromise = loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY
    );
    const handleBuyNow = async (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn === null) return;

        if (!isLoggedIn) {
            toast.warning("Please login first");
            navigate("/login");
            return;
        }
        navigate("/dashboard/customer/checkout", {
            state: {
                product
            }
        });
        try {

            const stripe = await stripePromise;

            const { data } = await axios.post(
                "http://localhost:3000/api/payment/create-checkout-session",
                {
                    productName: product.productName,
                    price: product.price,
                    quantity: 1,
                    image: product.image
                }
            );

            await stripe.redirectToCheckout({
                sessionId: data.id
            });

        } catch (error) {
            console.log(error);
            toast.error("Payment failed");
        }
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

                const cartItem = cartItems.find(
                    product =>
                        String(product._id) === String(item._id)
                );

                const isWishlisted = wishlistItems.some(
                    product =>
                        String(product._id) === String(item._id)
                );

                return (
                    <div
                        key={item._id}
                        className="flex flex-col h-full"
                    >
                        <Link
                            to={`/product/${item._id}`}
                            className="relative flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                        >

                            {/* Wishlist Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (isWishlisted) {
                                        dispatch(removeFromWishlist(item._id));
                                    } else {
                                        dispatch(addToWishlist(item));
                                    }
                                }}
                                className="absolute top-3 right-3 z-10 bg-white border border-gray-200 p-2 rounded-full shadow-sm"
                            >
                                <Heart
                                    size={20}
                                    className={`transition-all duration-300 ${isWishlisted
                                            ? "fill-red-500 text-red-500"
                                            : "text-gray-500"
                                        }`}
                                />
                            </button>

                            {/* Product Image */}
                            <div className="bg-gray-50 p-5 flex justify-center items-center h-52">
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="h-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-4 flex-1 flex flex-col">

                                <h2 className="font-medium text-gray-900 text-sm line-clamp-2">
                                    {item.productName}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-semibold text-lg text-gray-900">
                                        ₹{item.price}
                                    </span>

                                    <span className="text-xs border border-gray-300 px-2 py-1 rounded-full text-gray-600">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="mt-5 flex gap-2">

                                    <div className="flex-1">

                                        {!cartItem ? (
                                            <button
                                                onClick={(e) =>
                                                    handleAddToCart(e, item)
                                                }
                                                className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                                            >
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <div className="w-full h-[42px] border border-gray-300 rounded-full flex justify-center items-center gap-4 bg-white">
                                                <button
                                                    onClick={(e) =>
                                                        handleDecrease(e, item._id)
                                                    }
                                                    className="font-semibold px-2 text-gray-700"
                                                >
                                                    -
                                                </button>

                                                <span className="text-gray-900 text-sm">
                                                    {cartItem.quantity}
                                                </span>

                                                <button
                                                    onClick={(e) =>
                                                        handleAddToCart(e, item)
                                                    }
                                                    className="font-semibold px-2 text-gray-700"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                    <button
                                        onClick={(e) =>
                                            handleBuyNow(e, item)
                                        }
                                        className="flex-1 border border-black text-black py-2.5 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
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