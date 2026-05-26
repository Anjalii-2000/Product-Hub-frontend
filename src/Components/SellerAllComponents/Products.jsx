import React from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default function Products({
    products = [],
    setProducts,
    setEditingId,
    setForm,
    setPreviewImage,
    setShowModal,
    sellerName
}) {


    const handleEdit = (item) => {

        setForm({
            productName: item.productName,
            price: item.price,
            category: item.category,
            description: item.description,
            image: null // user can re-upload image
        });

        setPreviewImage(item.image || "");

        setEditingId(item._id);
        setShowModal(true);
    };


    const handleDelete = async (id) => {

        const previousProducts = [...products];

        try {

            setProducts((prev) =>
                prev.filter((item) => item._id !== id)
            );


            await axios.delete(
                `${BASE_URL}/api/delete-product/${id}`,
                {
                    withCredentials: true
                }
            );

        } catch (error) {
            console.log("Delete failed:", error);
            setProducts(previousProducts);
        }
    };

    return (
        <div className="w-full">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Products
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all your products here
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#6b61e2] hover:bg-[#5b51d5] text-white px-5 py-3 rounded-xl shadow-md transition duration-300"
                >
                    + Add Product
                </button>
            </div>

            {/* EMPTY STATE */}
            {products.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No Products Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start by adding your first product
                    </p>
                </div>
            ) : (
                /* PRODUCT GRID */
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {[...products].reverse().map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100"
                        >

                            {/* IMAGE */}
                            <div className="overflow-hidden">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="h-52 w-full object-cover hover:scale-105 transition duration-500"
                                    />
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <div className="flex items-center justify-between">

                                    <h2 className="font-bold text-lg text-gray-800 truncate">
                                        {item.productName}
                                    </h2>

                                    <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                                        ₹{item.price}
                                    </span>

                                </div>

                                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                                    {item.description}
                                </p>

                                {/* CATEGORY */}
                                <div className="mt-4">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                                        {item.category}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        {sellerName}
                                    </p>
                                </div>


                                {/* BUTTONS */}
                                <div className="flex gap-3 mt-5">

                                    {/* EDIT */}
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
                                    >
                                        Edit
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}