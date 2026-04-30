import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, Shirt, Tv, Utensils, BookOpen } from "lucide-react";
import LoginModal from "../../LoginModal/LoginModal";
import logo from "../../../assets/logo.jpeg";

const categories = [
    { name: "All", icon: null },
    { name: "Electronics", icon: <Tv size={22} /> },
    { name: "Clothing", icon: <Shirt size={22} /> },
    { name: "Food", icon: <Utensils size={22} /> },
    { name: "Books", icon: <BookOpen size={22} /> },
];

export const Header = ({ setCategory }) => {
    const navigate = useNavigate();
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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
                            src={logo}
                            alt="logo"
                            className="w-auto h-16 transition-transform duration-300 "
                        />
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <div className="flex items-center gap-10 md:gap-14 text-sm text-black font-semibold tracking-wide">

                            {categories.map((cat, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveIndex(index)
                                            if (cat.name == "All") {
                                                setCategory("")

                                            } else {
                                                setCategory(cat.name)



                                            }
                                        }}
                                        className="cursor-pointer relative group"
                                    >
                                        <span
                                            className={`transition duration-300 
                                            ${isActive
                                                    ? "text-black"
                                                    : "text-gray-500 group-hover:text-black"
                                                }`}
                                        >
                                            {cat.name.toUpperCase()}
                                        </span>

                                        <div
                                            className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

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