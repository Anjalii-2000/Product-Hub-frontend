import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpeg";

export default function Seller() {

    const [form, setForm] = useState({
        productName: "",
        price: "",
        category: "Electronics",
        description: "",
        image: null
    });

    const [previewImage, setPreviewImage] = useState("");

    const [view, setView] = useState("dashboard");
    const [sellerName, setSellerName] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [profile, setProfile] = useState({
        firstName: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();

        if (profile.password !== profile.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setShowProfileModal(false);
    };
    // const navigate = useNavigate();
    useEffect(() => {
        // const token = localStorage.getItem("token");

        // if (token) {
        //     navigate("/seller");
        // }
        fetchProducts();
        fetchMe();
    }, []);

    // NORMAL INPUT CHANGE
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // IMAGE CHANGE
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

    const fetchMe = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:3000/api/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSellerName(res.data.user.firstName);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:3000/api/my-product", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProducts(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    // SUBMIT PRODUCT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const token = localStorage.getItem("token");

            const url = editingId
                ? `http://localhost:3000/api/update-product/${editingId}`
                : "http://localhost:3000/api/create-product";

            const method = editingId ? "put" : "post";

            // IMPORTANT -> FORMDATA
            const formData = new FormData();

            formData.append("productName", form.productName);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("description", form.description);

            // multer field name = image
            if (form.image) {
                formData.append("image", form.image);
            }

            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

            setMessage(editingId ? "Product updated" : "Product created");

            setForm({
                productName: "",
                price: "",
                category: "Electronics",
                description: "",
                image: null
            });

            setPreviewImage("");

            setEditingId(null);
            setShowModal(false);

            fetchProducts();

        } catch (error) {

            console.log(error);

            setMessage(error.response?.data?.message || "Error");

        }

        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:3000/api/delete-product/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchProducts();

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (item) => {

        setForm({
            productName: item.productName,
            price: item.price,
            category: item.category,
            description: item.description,
            image: null
        });

        setPreviewImage(item.image);

        setEditingId(item._id);

        setShowModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const electronicsCount = products.filter(
        (item) => item.category === "Electronics"
    ).length;

    const foodCount = products.filter(
        (item) => item.category === "Food"
    ).length;

    const clothingCount = products.filter(
        (item) => item.category === "Clothing"
    ).length;

    const booksCount = products.filter(
        (item) => item.category === "Books"
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 font-serif relative">

            {/* TOPBAR */}
            <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

                <img
                    src={logo}
                    onClick={() => window.location.reload()}
                    className="h-11 w-20 cursor-pointer"
                    alt="logo"
                />

                <div className="relative">

                    <div
                        onClick={() => setShowMenu(!showMenu)}
                        className="font-semibold text-gray-700 cursor-pointer"
                    >
                        Welcome, {sellerName} ▼
                    </div>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>
            </div>

            <div className="flex pt-16">

                {/* SIDEBAR */}
                <div className="w-64 bg-white h-screen p-6 shadow border-r">

                    <h2 className="font-bold text-lg text-black mb-6">
                        Seller Panel
                    </h2>

                    <ul className="space-y-2">

                        <li
                            onClick={() => setView("dashboard")}
                            className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                            ${view === "dashboard"
                                    ? "bg-[#6b61e2] text-white"
                                    : "text-black hover:bg-gray-100"
                                }`}
                        >
                            Dashboard
                        </li>

                        <li
                            onClick={() => setShowProfileModal(true)}
                            className="cursor-pointer px-4 py-2 rounded-lg font-medium text-black hover:bg-gray-100"
                        >
                            Edit Profile
                        </li>

                        <li
                            onClick={() => setView("products")}
                            className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                            ${view === "products"
                                    ? "bg-[#6b61e2] text-white"
                                    : "text-black hover:bg-gray-100"
                                }`}
                        >
                            Products
                        </li>

                        <li
                            onClick={() => {

                                setEditingId(null);

                                setForm({
                                    productName: "",
                                    price: "",
                                    category: "Electronics",
                                    description: "",
                                    image: null
                                });

                                setPreviewImage("");

                                setShowModal(true);
                            }}
                            className="cursor-pointer px-4 py-2 rounded-lg font-medium text-black hover:bg-gray-100"
                        >
                            Add Product
                        </li>

                        <li
                            onClick={() => setView("settings")}
                            className={`cursor-pointer px-4 py-2 rounded-lg font-medium
                            ${view === "settings"
                                    ? "bg-[#6b61e2] text-white"
                                    : "text-black hover:bg-gray-100"
                                }`}
                        >
                            Settings
                        </li>

                        <li
                            onClick={handleLogout}
                            className="cursor-pointer px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </li>

                    </ul>
                </div>

                {/* MAIN */}
                <div className="flex-1 p-6 space-y-8">

                    {/* DASHBOARD */}
                    {view === "dashboard" && (
                        <div>

                            <h1 className="text-2xl font-bold mb-6">
                                Dashboard
                            </h1>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                                <div className="bg-white p-5 rounded-xl shadow">
                                    <p className="text-gray-600">Total Products</p>
                                    <h2 className="text-2xl font-bold">
                                        {products.length}
                                    </h2>
                                </div>

                                <div className="bg-white p-5 rounded-xl shadow">
                                    <p className="text-gray-600">Electronics</p>
                                    <h2 className="text-2xl font-bold">
                                        {electronicsCount}
                                    </h2>
                                </div>

                                <div className="bg-white p-5 rounded-xl shadow">
                                    <p className="text-gray-600">Food</p>
                                    <h2 className="text-2xl font-bold">
                                        {foodCount}
                                    </h2>
                                </div>

                                <div className="bg-white p-5 rounded-xl shadow">
                                    <p className="text-gray-600">Books</p>
                                    <h2 className="text-2xl font-bold">
                                        {booksCount}
                                    </h2>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* PRODUCTS */}
                    {view === "products" && (
                        <div>

                            <h1 className="text-2xl font-bold mb-6">
                                My Products
                            </h1>

                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                                {products.map((item) => (

                                    <div
                                        key={item._id}
                                        className="bg-white rounded-xl shadow p-4"
                                    >

                                        <img
                                            src={`http://localhost:3000${item.image}`}
                                            alt="product"
                                            className="h-32 w-full object-cover rounded"
                                        />

                                        <h3 className="font-semibold mt-2">
                                            {item.productName}
                                        </h3>

                                        <p className="text-green-600">
                                            ₹{item.price}
                                        </p>

                                        <div className="flex gap-3 justify-between mt-3">

                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="flex-1 text-sm px-3 py-1.5 bg-white text-blue-600 border border-blue-200 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="flex-1 text-sm px-3 py-1.5 bg-white text-red-600 border border-red-200 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* SETTINGS */}
                    {view === "settings" && (

                        <div>

                            <h1 className="text-2xl font-bold mb-6">
                                Settings
                            </h1>

                            <div className="bg-white rounded-2xl shadow p-6 space-y-4 max-w-xl">

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Change Password</span>
                                    <button className="text-blue-600">Open</button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Update Profile</span>

                                    <button
                                        onClick={() => setShowProfileModal(true)}
                                        className="text-blue-600"
                                    >
                                        Open
                                    </button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">

                                    <span>Dark Mode</span>

                                    <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={`px-4 py-1 rounded-full text-white
                        ${darkMode ? "bg-green-600" : "bg-gray-400"}`}
                                    >
                                        {darkMode ? "ON" : "OFF"}
                                    </button>

                                </div>

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Notification Settings</span>
                                    <button className="text-blue-600">Open</button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Payment Details</span>
                                    <button className="text-blue-600">Open</button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Address Settings</span>
                                    <button className="text-blue-600">Open</button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">

                                    <span>Language</span>

                                    <select className="border px-3 py-1 rounded-lg">
                                        <option>English</option>
                                        <option>Hindi</option>
                                    </select>

                                </div>

                                <div className="flex justify-between items-center border-b pb-3">
                                    <span>Help & Support</span>
                                    <button className="text-blue-600">Contact</button>
                                </div>

                                <div className="flex justify-between items-center border-b pb-3">

                                    <span className="text-red-600">
                                        Delete Account
                                    </span>

                                    <button className="text-red-600">
                                        Delete
                                    </button>

                                </div>

                                <div className="flex justify-between items-center">

                                    <span>Logout</span>

                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600"
                                    >
                                        Logout
                                    </button>

                                </div>

                            </div>

                        </div>
                    )}


                </div>
            </div>

            {/* ADD PRODUCT MODAL */}
            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                    <div
                        className="bg-white w-[500px] p-6 rounded-xl shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex justify-between mb-4">

                            <h2 className="text-xl font-bold">
                                {editingId ? "Edit Product" : "Add Product"}
                            </h2>

                            <button onClick={() => setShowModal(false)}>
                                ✖
                            </button>

                        </div>

                        {message && (
                            <p className="mb-3 text-center text-green-600">
                                {message}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* IMAGE */}
                            <div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full text-black p-3 border rounded-2xl"
                                />

                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        className="w-full h-40 object-cover rounded-xl mt-3"
                                    />
                                )}
                            </div>

                            {/* PRODUCT NAME */}
                            <input
                                name="productName"
                                value={form.productName}
                                onChange={handleChange}
                                placeholder="Product Name"
                                className="w-full text-black p-4 border rounded-2xl"
                            />

                            {/* PRICE */}
                            <input
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="w-full text-black p-4 border rounded-2xl"
                            />

                            {/* CATEGORY */}
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full p-4 border text-black rounded-2xl"
                            >
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Food</option>
                                <option>Books</option>
                            </select>

                            {/* DESCRIPTION */}
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Description"
                                className="w-full text-black p-4 border rounded-2xl"
                            />

                            {/* BUTTON */}
                            <button
                                disabled={loading}
                                className="w-full py-3 bg-black text-white rounded-2xl"
                            >
                                {loading ? "Saving..." : "Save Product"}
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}