import React from "react";

export default function Settings({
    setShowProfileModal
}) {

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Settings
            </h1>

            <div className="bg-white p-6 rounded-xl shadow">

                <button
                    onClick={() => setShowProfileModal(true)}
                    className="text-blue-600"
                >
                    Edit Profile
                </button>

            </div>

        </div>
    );
}