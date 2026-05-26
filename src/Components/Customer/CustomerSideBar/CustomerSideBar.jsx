// src/Components/Customer/CustomerSidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";

const CustomerSideBar = ({ customerName, handleLogout }) => {
    const navigate = useNavigate();
    const [active, setActive] = useState("home");
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <div className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">

            {/* Profile Section */}
            <div className="px-6 py-8 border-b border-gray-100">
                <div className="flex flex-col items-center">

                    <div
                        onClick={() => navigate("/dashboard/customer")}
                        className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold cursor-pointer"
                    >
                        {customerName.charAt(0)}
                    </div>

                    <h2
                        onClick={() => navigate("/dashboard/customer")}
                        className="mt-4 text-base font-semibold text-gray-900 cursor-pointer"
                    >
                        {customerName}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Customer Account
                    </p>

                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 px-4 py-6 flex flex-col gap-2">

                <button
                    onClick={() => {
                        setActive("home");
                        navigate("/dashboard/customer");
                        window.location.reload();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${active === "home"
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    <span className="text-lg">🏠</span>
                    Home
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/editprofile")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <span className="text-lg">✏️</span>
                    Edit Profile
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/customercart")}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <div className="flex items-center gap-3">
                        <ShoppingCart size={18} />
                        <span>Cart</span>
                    </div>

                    {cartItems.length > 0 && (
                        <span className="min-w-[22px] h-[22px] flex items-center justify-center text-xs bg-black text-white rounded-full px-1">
                            {cartItems.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/customerwishlist")}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <div className="flex items-center gap-3">
                        <Heart size={18} className="text-gray-700" />
                        <span>Wishlist</span>
                    </div>

                    {wishlistItems.length > 0 && (
                        <span className="min-w-[22px] h-[22px] flex items-center justify-center text-xs bg-black text-white rounded-full px-1">
                            {wishlistItems.length}
                        </span>
                    )}
                </button>

            </div>

            {/* Logout */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <span className="text-lg">🚪</span>
                    Logout
                </button>
            </div>

        </div>
    );
};

export default CustomerSideBar;