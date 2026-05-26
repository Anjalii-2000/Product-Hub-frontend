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
            <header className="w-full font-serif font-bold fixed top-0 left-0 z-50 bg-white text-black shadow-sm border-b">
                <div className="w-full flex items-center justify-between px-4 md:px-10 py-3">

                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img
                            onClick={() => window.location.reload()}
                            src={logo}
                            alt="logo"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-3 md:gap-5">

                        <button
                            onClick={() => setOpenLoginModal(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition"
                        >
                            <Heart size={18} />
                            <span>Wishlist</span>
                        </button>

                        <button
                            onClick={() => setOpenLoginModal(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition relative"
                        >
                            <ShoppingCart size={18} />
                            <span>Cart</span>
                        </button>

                        <button
                            onClick={() => setOpenLoginModal(true)}
                            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50 transition"
                        >
                            <User size={18} />
                            <span>Profile</span>
                        </button>

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