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
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Products
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Manage all your products here
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                    + Add Product
                </button>

            </div>

            {/* EMPTY STATE */}
            {products.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        No Products Found
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        Start by adding your first product
                    </p>
                </div>
            ) : (
                /* PRODUCT GRID */
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {[...products].reverse().map((item) => (
                        <div
                            key={item._id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
                        >

                            {/* IMAGE */}
                            <div className="border-b border-gray-100">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="h-48 w-full object-contain bg-white"
                                    />
                                )}
                            </div>

                            {/* CONTENT */}
                            <div className="p-4">

                                <div className="flex items-start justify-between gap-3">

                                    <h2 className="font-medium text-gray-900 text-sm line-clamp-2">
                                        {item.productName}
                                    </h2>

                                    <span className="text-sm font-medium text-gray-900">
                                        ₹{item.price}
                                    </span>

                                </div>

                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                    {item.description}
                                </p>

                                {/* CATEGORY */}
                                <div className="mt-3">
                                    <span className="border border-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                                        {item.category}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    {sellerName}
                                </p>

                                {/* BUTTONS */}
                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm transition hover:bg-black hover:text-white hover:border-gray-400"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm transition hover:bg-black hover:text-white hover:border-gray-400"
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