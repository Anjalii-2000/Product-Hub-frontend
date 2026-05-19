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
        <div className="w-64 min-h-screen bg-white shadow-lg p-6">
            {/* PROFILE */}
            <div className="flex flex-col items-center border-b pb-5">
                <div onClick={() => navigate("/dashboard/customer")}
                    className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl cursor-pointer">
                    {customerName.charAt(0)}
                </div>
                <h2
                    onClick={() => navigate("/dashboard/customer")} className="mt-3 text-lg font-bold cursor-pointer">{customerName}
                </h2>
            </div>

            {/* MENU */}
            <div className="mt-6 flex flex-col gap-3">
                <button
                    onClick={() => {
                        setActive("home");
                        navigate("/dashboard/customer");
                        window.location.reload(); 
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-100 ${active === "home" ? "bg-indigo-100 font-semibold" : ""
                        }`}
                >
                    🏠 Home
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/profile")}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-100"
                >
                    ✏️ Edit Profile
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/customercart")}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full hover:bg-indigo-100 transition"
                >
                    <ShoppingCart size={18} />
                    <span className="text-sm">Cart</span>
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                            {cartItems.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => navigate("/dashboard/customer/customerwishlist")}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-indigo-100 relative"
                >
                    <div className="flex items-center gap-2">
                        <Heart size={18} className="text-red-500" />
                        <span className="text-sm font-medium">Wishlist</span>
                    </div>
                    {wishlistItems.length > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                            {wishlistItems.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-100"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default CustomerSideBar;