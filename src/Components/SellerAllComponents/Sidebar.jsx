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
        <div className="w-64 bg-white h-screen p-6 shadow border-r">

            <h2 className="font-bold text-lg text-black mb-6">
                Seller Panel
            </h2>

            <ul className="space-y-2">

                {/* DASHBOARD */}
                <li
                    onClick={() => setView("dashboard")}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                    ${view === "dashboard"
                        ? "bg-[#6b61e2] text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                >
                    Dashboard
                </li>

                {/* EDIT PROFILE */}
                <li
                    onClick={() => setShowProfileModal(true)}
                    className="cursor-pointer px-4 py-2 rounded-lg font-medium text-black hover:bg-gray-100"
                >
                    Edit Profile
                </li>

                {/* PRODUCTS */}
                <li
                    onClick={() => setView("products")}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                    ${view === "products"
                        ? "bg-[#6b61e2] text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                >
                    Products
                </li>
              
                {/* LOGOUT */}
                <li
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
                >
                    Logout
                </li>

            </ul>
        </div>
    );
}