import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductData = ({
    products = [],
    loading,
    error,
    wishlist = [],
    toggleWishlist,
}) => {
    const navigate = useNavigate();
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [pendingId, setPendingId] = useState(null);

    const handleWishlist = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const isLoggedIn = !!localStorage.getItem("token");

        if (!isLoggedIn) {
            setPendingId(id);
            setShowAuthPopup(true);
            return;
        }

        toggleWishlist && toggleWishlist(id);
        toast.success("Wishlist updated");
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
            toggleWishlist && toggleWishlist(pendingId);
            toast.success("Added to wishlist");
            setPendingId(null);
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-20 text-lg font-semibold w-full">
                Loading...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center mt-20 text-red-500 text-lg font-semibold w-full">
                Error fetching products
            </p>
        );
    }

    if (products.length === 0) {
        return (
            <p className="text-center mt-20 text-gray-500 text-lg font-semibold w-full">
                No products found
            </p>
        );
    }

    return (
        <>
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((item) => (
                    <Link key={item._id} to={`/product/${item._id}`}>
                        <div className="relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-indigo-200">

                            <button
                                onClick={(e) => handleWishlist(e, item._id)}
                                className="absolute top-3 right-3 text-2xl z-10"
                            >
                                {wishlist.includes(item._id) ? "❤️" : "🤍"}
                            </button>

                            <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-5 flex justify-center items-center h-52 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-in-out"
                                />
                            </div>

                            <div className="p-5 space-y-3">
                                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition">
                                    {item.productName}
                                </h2>

                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-xl font-bold text-indigo-600">
                                        ₹{item.price}
                                    </span>

                                    <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {showAuthPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-80 text-center shadow-xl">
                        <h2 className="text-lg font-semibold mb-2">
                            Login Required
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            Please login or register to continue.
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={handleLogin}
                                className="bg-indigo-600 text-white px-4 py-2 rounded"
                            >
                                Login
                            </button>

                            <button
                                onClick={handleRegister}
                                className="bg-gray-200 px-4 py-2 rounded"
                            >
                                Register
                            </button>
                        </div>

                        <button
                            onClick={() => setShowAuthPopup(false)}
                            className="mt-3 text-sm text-gray-500"
                        >
                            Close
                        </button>

                        <button
                            onClick={continueAfterLogin}
                            className="mt-2 text-sm text-green-600"
                        >
                            I already logged in
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductData;