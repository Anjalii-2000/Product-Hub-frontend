import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart } from "lucide-react";
import LoginModal from "../../LoginModal/LoginModal";
import logo from "../../../assets/logo.jpeg";
import { useSelector } from "react-redux";


export const Header = ({ setCategory }) => {
    const navigate = useNavigate();
    const { cartItems } = useSelector(
        (state) => state.cart
    );

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const requireAuth = (callback) => {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);

        if (!token) {
            console.log("NOT LOGGED IN → OPEN MODAL");
            setOpenLoginModal(true);
        } else {
            console.log("LOGGED IN → NAVIGATE");
            callback();
        }
    };



    return (
        <>
            <header className="w-full font-serif font-bold fixed top-0 left-0 z-50 bg-white text-black shadow-md">
                <div className="w-full flex items-center justify-between px-6 md:px-12 py-4">

                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img
                            onClick={() => window.location.reload()}
                            src={logo}
                            alt="logo"
                            className="w-auto h-16 transition-transform duration-300 "
                        />
                    </Link>
                    

                    <div className="flex items-center gap-4 md:gap-6">

                        <div className="flex items-center gap-4 md:gap-6">

                            <button
                                onClick={() => setOpenLoginModal(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition"
                            >
                                <Heart size={18} />
                                <span className="text-sm">Wishlist</span>
                            </button>
                            <button
                                onClick={() =>
                                    setOpenLoginModal(true)}
                                className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400 hover:bg-indigo-100 transition"
                            >
                                <ShoppingCart size={18} />
                                <span className="text-sm">Cart</span>
                            </button>

                            <button
                                onClick={() => setOpenLoginModal(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-100 transition"
                            >
                                <User size={18} />
                                <span className="text-sm">Profile</span>
                            </button>

                        </div>
                    </div>
                </div>
            </header>
            <LoginModal
                open={openLoginModal}
                onClose={() => setOpenLoginModal(false)}
                onLoginClick={() => {
                    setOpenLoginModal(false);
                    navigate("/login");
                }}
                onRegisterClick={() => {
                    setOpenLoginModal(false);
                    navigate("/register");
                }}
            />
        </>
    );
};