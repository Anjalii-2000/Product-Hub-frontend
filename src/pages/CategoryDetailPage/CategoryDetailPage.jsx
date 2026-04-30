import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function CategoryDetail() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoryProducts = async () => {
            const res = await axios.get(
                `https://dummyjson.com/products/category/${id}`
            );
            setProducts(res.data.products);
        };
        getCategoryProducts();
    }, [id]);

    return (
        <div className="font-serif bg-gray-100 min-h-screen px-4 md:px-10 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 capitalize">
                {id} Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
                    >
                        <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
                            <img
                                src={item.thumbnail}
                                alt="title"
                                className="h-[180px] object-contain hover:scale-105 transition duration-300"
                            />
                        </div>

                        <div className="mt-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                {item.title}
                            </h2>

                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex justify-center items-center gap-2 mt-3">
                                <span className="text-sm line-through text-red-400">
                                    ${item.discountPercentage}
                                </span>
                                <span className="text-lg font-bold text-black">
                                    ${item.price}
                                </span>
                            </div>

                            <div className="mt-2 ">
                                <span
                                    className="inline-block px-3 py-1 rounded-full text-white text-xs font-semibold"
                                    style={{
                                        backgroundColor:
                                            item.rating >= 3 ? "green" : "orange",
                                    }}
                                >
                                    {item.rating} ★
                                </span>
                            </div>

                            {/* <button className="mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                                View Details
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}