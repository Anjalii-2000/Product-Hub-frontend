import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpeg";

const BASE_URL = "http://localhost:3000";

export default function Topbar({ sellerName }) {

    const [showMenu, setShowMenu] = useState(false);

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
        <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

            {/* LOGO */}
            <img
                src={logo}
                alt="logo"
                className="h-11 w-20 cursor-pointer"
                onClick={() => window.location.reload()}
            />
            <div>

            </div>
            {/* RIGHT SIDE */}
            <div className="relative">

                <div
                    onClick={() => setShowMenu(!showMenu)}
                    className="font-semibold text-gray-700 cursor-pointer"
                >
                    Welcome, {sellerName} ▼
                </div>

                {/* DROPDOWN */}
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                            Logout
                        </button>

                    </div>
                )}
            </div>

        </div>
    );
}