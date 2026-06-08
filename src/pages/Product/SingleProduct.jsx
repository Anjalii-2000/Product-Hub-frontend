import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getproduct/${id}`);
            setProduct(response.data.data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(`http://localhost:3000/api/me`, { withCredentials: true });
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        fetchProduct();
    }, [id]);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

    const handleBuyNow = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoggedIn === null) return;

        if (!isLoggedIn) {
            toast.warning("Please login first");
            navigate("/login");
            return;
        }

        try {
            const stripe = await stripePromise;
            console.log("stripe", stripe);

            const { data } = await axios.post(
                "http://localhost:3000/api/payment/create-checkout-session",
                { productId: product._id },
                { withCredentials: true }
            );

            window.location.href = data.url;
        } catch (error) {
            console.log(error);
            toast.error("Payment failed");
        }
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">Error loading product.</p>;

    return (
        <div className="min-h-screen bg-[#f5f5f0] font-sans">
            {/* Breadcrumb / Back */}
            <div className="px-6 md:px-16 pt-8 pb-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors duration-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>
            </div>

            {/* Main Product Card */}
            <div className="px-6 md:px-16 pb-16">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 flex flex-col lg:flex-row min-h-[560px]">

                    {/* Left — Image Panel */}
                    <div className="lg:w-1/2 bg-[#f0eeea] relative flex items-center justify-center p-10 md:p-16 min-h-[360px] lg:min-h-auto">
                        {/* Decorative circle */}
                        <div className="absolute w-72 h-72 rounded-full bg-white/40 blur-2xl" />
                        <img
                            src={product.image || "https://via.placeholder.com/300"}
                            alt={product.productName}
                            className="relative z-10 h-72 md:h-80 w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                        />
                        {/* Category badge — floated on image panel */}
                        <span className="absolute top-6 left-6 text-[11px] font-bold uppercase tracking-widest bg-white text-gray-500 px-3 py-1.5 rounded-full shadow-sm">
                            {product.category}
                        </span>
                    </div>

                    {/* Right — Info Panel */}
                    <div className="lg:w-1/2 flex flex-col justify-between p-8 md:p-12">

                        {/* Top info */}
                        <div className="space-y-5">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
                                {product.productName}
                            </h1>

                            {/* Rating row — decorative, static */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">4.8 · 2.4k reviews</span>
                            </div>

                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                {product.description}
                            </p>

                            {/* Divider */}
                            <div className="border-t border-gray-100" />

                            {/* Price block */}
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
                                <span className="text-sm text-emerald-600 font-semibold mb-1.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    In Stock
                                </span>
                            </div>

                            {/* Perks */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: "🚚", label: "Free Delivery", sub: "Orders above ₹499" },
                                    { icon: "↩️", label: "Easy Returns", sub: "7-day return policy" },
                                    { icon: "🔒", label: "Secure Pay", sub: "100% safe checkout" },
                                    { icon: "✅", label: "Genuine", sub: "100% authentic product" },
                                ].map(({ icon, label, sub }) => (
                                    <div key={label} className="flex items-start gap-2.5 bg-gray-50 rounded-2xl p-3">
                                        <span className="text-lg leading-none mt-0.5">{icon}</span>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{label}</p>
                                            <p className="text-[11px] text-gray-400">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <button
                                onClick={(e) => handleAddToCart(e, item)}
                                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-800 text-sm font-bold py-4 rounded-2xl transition-all duration-300 group"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-indigo-600 text-white text-sm font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-indigo-500/30 group"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;