import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../../Components/SellerAllComponents/Sidebar";
import Topbar from "../../Components/SellerAllComponents/Topbar";
import Dashboard from "../../Components/SellerAllComponents/Dashboard";
import Products from "../../Components/SellerAllComponents/Products";
import Settings from "../../components/SellerAllComponents/Settings";
import ProductModal from "../../Components/SellerAllComponents/ProductModal";
import EditProfile from "../../Components/SellerAllComponents/EditProfile";

export default function Seller() {

    const [view, setView] = useState("dashboard");
    const [sellerName, setSellerName] = useState("");
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [form, setForm] = useState({
        productName: "",
        price: "",
        category: "Electronics",
        description: "",
        image: null
    });

    const [previewImage, setPreviewImage] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [profile, setProfile] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    useEffect(() => {
        fetchProducts();
        fetchMe();
    }, []);

    const fetchMe = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/api/me",
                {
                    withCredentials: true
                }
            );

            setSellerName(res.data.user.firstName);

            setProfile({
                name: res.data.user.firstName || "",
                phone: res.data.user.phone || "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:3000/api/my-product",
                {
                    withCredentials: true
                }
            );

            setProducts(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Topbar sellerName={sellerName} />

            <div className="flex pt-16">

                <Sidebar
                    view={view}
                    setView={setView}
                    setShowModal={setShowModal}
                    setShowProfileModal={setShowProfileModal}
                />

                <div className="flex-1 p-6">

                    {view === "dashboard" && (
                        <Dashboard products={products} />
                    )}

                    {view === "products" && (
                        <Products
                            products={products}
                            fetchProducts={fetchProducts}
                            setEditingId={setEditingId}
                            setForm={setForm}
                            setPreviewImage={setPreviewImage}
                            setShowModal={setShowModal}
                            sellerName={sellerName}
                        />
                    )}

                    {view === "settings" && (
                        <Settings setShowProfileModal={setShowProfileModal} />
                    )}

                </div>
            </div>

            <EditProfile
                showProfileModal={showProfileModal}
                setShowProfileModal={setShowProfileModal}
                profile={profile}
                setProfile={setProfile}
                setSellerName={setSellerName}
            />

            <ProductModal
                showModal={showModal}
                setShowModal={setShowModal}
                form={form}
                setForm={setForm}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                editingId={editingId}
                setEditingId={setEditingId}
                fetchProducts={fetchProducts}
                
            />

        </div>
    );
}