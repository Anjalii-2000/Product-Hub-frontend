import React from "react";

export default function Sidebar({
    view,
    setView,
    setShowModal,
    setShowProfileModal
}) {

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";
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

                {/* ADD PRODUCT */}
                <li
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer px-4 py-2 rounded-lg font-medium text-black hover:bg-gray-100"
                >
                    Add Product
                </li>

                {/* SETTINGS */}
                <li
                    onClick={() => setView("settings")}
                    className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                    ${view === "settings"
                            ? "bg-[#6b61e2] text-white"
                            : "text-black hover:bg-gray-100"
                        }`}
                >
                    Settings
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