import React from "react";
import axios from "axios";

export default function ProductModal({
    showModal,
    setShowModal,
    form,
    setForm,
    previewImage,
    setPreviewImage,
    editingId,
    setEditingId,
    fetchProducts
}) {

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setForm({
            ...form,
            image: file
        });

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("productName", form.productName);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("description", form.description);

            if (form.image) {
                formData.append("image", form.image);
            }

            const url = editingId
                ? `http://localhost:3000/api/update-product/${editingId}`
                : "http://localhost:3000/api/create-product";

            const method = editingId ? "put" : "post";

            await axios({
                method,
                url,
                data: formData,
                withCredentials: true
            });

            fetchProducts();

            setShowModal(false);
            setEditingId(null);

            setForm({
                productName: "",
                price: "",
                category: "Electronic",
                description: "",
                image: null
            });

            setPreviewImage("");

        } catch (error) {
            console.log("Product submit error:", error);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white w-[500px] max-w-[95%] p-6 rounded-xl border border-gray-300 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {editingId ? "Edit Product" : "Add Product"}
                    </h2>

                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-black transition"
                    >
                        ✖
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* File Upload */}
                    <div className="w-full border-2 border-dashed border-gray-400 rounded-lg p-5 bg-gray-50">
                        <p className="text-xs text-gray-500 mb-2">
                            Choose product image
                        </p>

                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-600
          file:mr-3 file:py-2 file:px-3 file:rounded-md
          file:border file:border-gray-300
          file:bg-white file:text-sm file:text-gray-700
          hover:file:bg-gray-100 cursor-pointer"
                        />
                    </div>

                    {/* Preview Image */}
                    {previewImage && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img
                                src={previewImage}
                                alt="preview"
                                className="h-40 w-full object-contain bg-white"
                            />
                        </div>
                    )}

                    {/* Product Name */}
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={form.productName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                    />

                    {/* Price */}
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                    />

                    {/* Category */}
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-500"
                    >
                        <option value="Electronic">Electronic</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food</option>
                        <option value="Book">Book</option>
                    </select>

                    {/* Description */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg text-sm h-24 resize-none focus:outline-none focus:border-gray-500"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                    >
                        Save Product
                    </button>

                </form>

            </div>
        </div>
    );
}