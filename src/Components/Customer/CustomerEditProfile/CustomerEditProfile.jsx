import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CustomerSideBar from "../CustomerSideBar/CustomerSideBar";
import CustomerHeader from "../CustomerHeader/CustomerHeader";

export default function CustomerEditProfile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Fetch user
    useEffect(() => {
        fetchMe();
    }, []);

    const fetchMe = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/me", {
                withCredentials: true
            });

            setUser(res.data.user);

            setProfile((prev) => ({
                ...prev,
                name: res.data.user.firstName || "",
                phone: res.data.user.phone || ""
            }));

        } catch (error) {
            console.log(error);
        }
    };

    // ✅ logout
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/logout",
                {},
                { withCredentials: true }
            );
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    const customerName = user?.firstName || "Customer";

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.put(
                "http://localhost:3000/api/update-profile",
                {
                    name: profile.name,
                    phone: profile.phone,
                    password: profile.password,
                    confirmPassword: profile.confirmPassword
                },
                { withCredentials: true }
            );

            setMessage(res.data.message);

            // clear password fields
            setProfile((prev) => ({
                ...prev,
                password: "",
                confirmPassword: ""
            }));

            // update header name instantly
            setUser(res.data.user);

        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* HEADER */}
            <CustomerHeader
                customerName={customerName}
                handleLogout={handleLogout}
            />

            <div className="flex pt-20">

                {/* SIDEBAR */}
                <CustomerSideBar
                    customerName={customerName}
                    handleLogout={handleLogout}
                />

                {/* MAIN CONTENT */}
                <div className="flex-1 flex justify-center items-start p-6">

                    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">

                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Edit Profile
                        </h2>

                        {message && (
                            <p className="text-center mb-3 text-sm text-blue-600">
                                {message}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={profile.name}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={profile.password}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                            />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={profile.confirmPassword}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-xl"
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}