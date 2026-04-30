import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif">

      {/* HEADER */}
      <div className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg">
             {user?.firstName || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-10">

        {/* WELCOME */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.firstName} 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Orders</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Wishlist</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Cart Items</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl"
            >
              🛍 Go to Shop
            </button>

            <button
              onClick={() => navigate("/favourites")}
              className="px-6 py-3 bg-pink-500 text-white rounded-xl"
            >
              ❤️ View Wishlist
            </button>

            <button className="px-6 py-3 bg-green-500 text-white rounded-xl">
              📦 My Orders
            </button>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

          <ul className="space-y-3 text-gray-600">
            <li>✅ Logged in successfully</li>
            <li>❤️ Added item to wishlist</li>
            <li>🛒 Viewed product</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;