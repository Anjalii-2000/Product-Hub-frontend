import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BASE_URL = "http://localhost:3000";

const categoryTheme = {
    electronic: { bg: "bg-blue-400" },
    clothing: { bg: "bg-pink-700" },
    food: { bg: "bg-yellow-600" },
    book: { bg: "bg-green-500" },
};

const ProductData = ({
    products = [],
    loading,
    error
}) => {

    if (loading) {
        return (
            <h2 className="text-center text-xl font-bold">
                Loading...
            </h2>
        );
    }

    if (error) {
        return (
            <h2 className="text-center text-red-500 text-xl font-bold">
                Error Loading Products
            </h2>
        );
    }

    if (!products.length) {
        return (
            <h2 className="text-center text-xl">
                No Products Found
            </h2>
        );
    }

    // Group products — LOGIC UNCHANGED
    const groupedProducts = products.reduce(
        (acc, product) => {
            const category = product.category?.trim()?.toLowerCase();
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        },
        {}
    );

    console.log("All Products:", products);
    console.log("Grouped Products:", groupedProducts);
    console.log("Available Categories:", Object.keys(groupedProducts));

    const categoryOrder = ["electronic", "clothing", "food", "book"];

    return (
        <div className="space-y-12">
            {categoryOrder.map((category) => {

                const items = groupedProducts[category];
                if (!items?.length) return null;
                const bgColor = categoryTheme[category]?.bg || "bg-gray-300";

                const prevClass = `swiper-prev-${category}`;
                const nextClass = `swiper-next-${category}`;

                return (
                    <div
                        key={category}
                        className={`${bgColor} rounded-2xl mt-10 px-6 py-6 md:px-8 md:py-7`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-5">
                            <div>
                                <h2 className="text-2xl font-semibold capitalize text-black leading-tight">
                                    {category}
                                </h2>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className={`${prevClass} flex items-center justify-center w-9 h-9 rounded-full bg-black/10 hover:bg-black border-0 transition-all duration-200 group`}
                                >
                                    <svg className="w-4 h-4 text-black group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    className={`${nextClass} flex items-center justify-center w-9 h-9 rounded-full bg-black/10 hover:bg-black border-0 transition-all duration-200 group`}
                                >
                                    <svg className="w-4 h-4 text-black group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: `.${prevClass}`,
                                nextEl: `.${nextClass}`,
                            }}
                            spaceBetween={14}
                            slidesPerView={4}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {items.map((item) => (
                                <SwiperSlide key={item._id}>
                                    <Link to={`/product/${item._id}`}>
                                        <div
                                            className="group relative bg-white rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                                            style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.07)" }}
                                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.14)"}
                                            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 8px 0 rgba(0,0,0,0.07)"}
                                        >
                                            {/* Badge */}
                                            <div className="absolute top-2.5 left-2.5 z-10">
                                                <span className="text-[9px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded-full">
                                                    New
                                                </span>
                                            </div>

                                            {/* Image */}
                                            <div className="bg-gray-50 h-[175px] flex justify-center items-center overflow-hidden px-5 pt-5 pb-2">
                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="h-[140px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px bg-gray-100" />

                                            {/* Content */}
                                            <div className="p-3.5 flex flex-col gap-0.5 flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">
                                                    {item.productName}
                                                </h3>
                                                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mt-0.5">
                                                    {item.description}
                                                </p>

                                                <div className="flex items-center justify-between mt-auto pt-2.5">
                                                    <span className="text-base font-bold text-gray-900">
                                                        ₹{item.price}
                                                    </span>
                                                    <span className="text-[10px] font-semibold text-white bg-black px-2.5 py-1 rounded-full group-hover:bg-gray-700 transition-colors duration-200">
                                                        View →
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom accent bar */}
                                            <div className="h-0.5 bg-black/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductData;