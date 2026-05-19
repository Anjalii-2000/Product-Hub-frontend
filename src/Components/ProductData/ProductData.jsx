import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const BASE_URL = "http://localhost:3000";

const categoryColors = {
    electronics: "bg-blue-200",
    clothing: "bg-pink-700",
    food: "bg-yellow-600",
    books: "bg-green-500"
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

    // Group products

    const groupedProducts = products.reduce(
        (acc, product) => {

            const category = product.category
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

    console.log("All Products:", products);
    console.log("Grouped Products:", groupedProducts);
    console.log(
        "Available Categories:",
        Object.keys(groupedProducts)
    );

    const categoryOrder = [
        "electronics",
        "clothing",
        "food",
        "books"
    ];

    return (

        <div className="space-y-12">

            {categoryOrder.map((category) => {

                const items =
                    groupedProducts[category] ||
                    groupedProducts[category + "s"];



                if (!items?.length)
                    return null;

                return (

                    <div
                        key={category}
                        className={`${categoryColors[category]} rounded-3xl p-6`}
                    >

                        <div className="flex justify-between items-center mb-8">

                            <h2 className="text-3xl font-bold capitalize text-black">

                                {category}

                            </h2>

                            <button className="bg-black text-white rounded-full w-10 h-10">

                                →

                            </button>

                        </div>

                        <Swiper
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

                                        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition h-full">

                                            <div className="bg-gray-100 h-[180px] flex justify-center items-center">

                                                <img
                                                    src={
                                                        item.image
                                                            ? `${BASE_URL}${item.image}`
                                                            : "/placeholder.png"
                                                    }
                                                    alt={item.productName}
                                                    className="h-[150px] object-contain"
                                                />

                                            </div>

                                            <div className="p-4">

                                                <h3 className="font-semibold text-lg text-black truncate">

                                                    {item.productName}

                                                </h3>

                                                <p className="text-sm text-black mt-2 line-clamp-2">

                                                    {item.description}

                                                </p>

                                                <div className="mt-3">

                                                    <span className="text-xl font-bold text-black">

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

                );

            })}

        </div>

    );

};

export default ProductData;