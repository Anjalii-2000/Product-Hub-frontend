import React from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default function Sidebar({
    view,
    setView,
    setShowModal,
    setShowProfileModal
}) {

    const handleLogout = async () => {
        try {
            await axios.post(
                `${BASE_URL}/api/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            window.location.href = "/login";

        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <div className="w-72 min-h-screen bg-white border-r border-gray-200 flex flex-col">

            {/* Header */}
            <div className="px-6 py-8 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                    Seller Panel
                </h2>
            </div>

            {/* Menu */}
            <div className="flex-1 px-4 py-6 flex flex-col gap-2">

                {/* DASHBOARD */}
                <button
                    onClick={() => setView("dashboard")}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition
      ${view === "dashboard"
                            ? "bg-gray-100 text-black"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    Dashboard
                </button>

                {/* EDIT PROFILE */}
                <button
                    onClick={() => setShowProfileModal(true)}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    Edit Profile
                </button>

                {/* PRODUCTS */}
                <button
                    onClick={() => setView("products")}
                    className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition
      ${view === "products"
                            ? "bg-gray-100 text-black"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    Products
                </button>

            </div>

            {/* Logout */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    Logout
                </button>
            </div>

        </div>
    );
}