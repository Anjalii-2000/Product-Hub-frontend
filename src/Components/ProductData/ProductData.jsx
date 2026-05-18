import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BASE_URL = "http://localhost:3000";

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


    // Group products by category
    const groupedProducts = products.reduce(
        (acc, product) => {

            const category =
                product.category
                    ?.trim()
                    ?.toLowerCase();

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(product);

            return acc;

        },
        {}
    );


    return (

        <div className="space-y-10">

            {Object.entries(groupedProducts)
                .map(([category, items]) => (

                    <div
                        key={category}
                        className="bg-slate-200 rounded-3xl p-5"
                    >

                        {/* Header */}

                        <div className="flex justify-between items-center mb-6">

                            <h2 className="text-3xl font-bold capitalize">

                                {category}

                            </h2>

                            <button
                                className="bg-black text-white rounded-full w-10 h-10 text-xl"
                            >
                                →
                            </button>

                        </div>


                        <Swiper
                            key={`${category}-${items.length}`}
                            modules={[Navigation]}
                            navigation
                            spaceBetween={20}
                            slidesPerView={4}

                            breakpoints={{

                                320: {
                                    slidesPerView: 1
                                },

                                640: {
                                    slidesPerView: 2
                                },

                                768: {
                                    slidesPerView: 3
                                },

                                1024: {
                                    slidesPerView: 4
                                }

                            }}
                        >

                            {items.map((item) => (

                                <SwiperSlide
                                    key={item._id}
                                >

                                    <Link
                                        to={`/product/${item._id}`}
                                    >

                                        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full">

                                            {/* Image */}

                                            <div className="bg-gray-100 h-[220px] flex justify-center items-center">

                                                <img
                                                    src={
                                                        item.image
                                                            ? `${BASE_URL}${item.image}`
                                                            : "/placeholder.png"
                                                    }
                                                    alt={item.productName}
                                                    className="h-[180px] object-contain"
                                                />

                                            </div>


                                            {/* Content */}

                                            <div className="p-4">

                                                <h3 className="font-semibold text-lg truncate">

                                                    {item.productName}

                                                </h3>

                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">

                                                    {item.description}

                                                </p>

                                                <div className="mt-3">

                                                    <span className="text-xl font-bold text-indigo-600">

                                                        ₹{item.price}

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </Link>

                                </SwiperSlide>

                            ))}

                        </Swiper>

                    </div>

                ))}

        </div>

    );
};

export default ProductData;