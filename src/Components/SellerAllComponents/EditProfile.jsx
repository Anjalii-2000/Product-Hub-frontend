import React from "react";
import axios from "axios";

export default function EditProfile({
    showProfileModal,
    setShowProfileModal,
    profile,
    setProfile,
    setSellerName
}) {

    const handleProfileChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.put(
                "http://localhost:3000/api/update-profile",
                {
                    name: profile.name,
                    password: profile.password,
                    confirmPassword: profile.confirmPassword,
                    phone: profile.phone
                },
                {
                    withCredentials: true
                }
            );

            alert(res.data.message);

            setSellerName(res.data.user.firstName);

            setShowProfileModal(false);

        } catch (error) {

            alert(error.response?.data?.message || "Error updating profile");
        }
    };

    if (!showProfileModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white w-[450px] max-w-[95%] p-6 rounded-xl border border-gray-200 shadow-lg">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-semibold text-gray-900">
                        Edit Profile
                    </h2>

                    <button
                        onClick={() => setShowProfileModal(false)}
                        className="text-gray-500 hover:text-black transition"
                    >
                        ✖
                    </button>

                </div>

                <form
                    onSubmit={handleProfileSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={profile.password}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={profile.confirmPassword}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 p-3 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                    />

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
                    >
                        Save Changes
                    </button>

                </form>

            </div>
        </div>
    );
}