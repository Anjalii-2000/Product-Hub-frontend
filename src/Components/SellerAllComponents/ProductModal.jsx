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

            const token = localStorage.getItem("token");

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
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchProducts();

            setShowModal(false);

            setEditingId(null);

            setForm({
                productName: "",
                price: "",
                category: "Electronics",
                description: "",
                image: null
            });

            setPreviewImage("");

        } catch (error) {
            console.log(error);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] p-6 rounded-xl">

                <div className="flex justify-between mb-4">

                    <h2 className="text-xl font-bold">
                        {editingId ? "Edit Product" : "Add Product"}
                    </h2>

                    <button onClick={() => setShowModal(false)}>
                        ✖
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    {previewImage && (
                        <img
                            src={previewImage}
                            alt=""
                            className="h-40 w-full object-cover rounded"
                        />
                    )}

                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={form.productName}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    >
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Food</option>
                        <option>Books</option>
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        Save Product
                    </button>

                </form>

            </div>
        </div>
    );
}