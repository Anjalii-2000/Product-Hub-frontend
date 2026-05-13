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
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

            <div className="bg-white w-[450px] p-6 rounded-xl">

                <div className="flex justify-between mb-5">

                    <h2 className="text-2xl font-bold">
                        Edit Profile
                    </h2>

                    <button
                        onClick={() => setShowProfileModal(false)}
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
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={profile.password}
                        onChange={handleProfileChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={profile.confirmPassword}
                        onChange={handleProfileChange}
                        className="w-full border p-3 rounded-xl"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        Save Changes
                    </button>

                </form>

            </div>
        </div>
    );
}