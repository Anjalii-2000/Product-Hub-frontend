import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const Dashboard = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/me`,
        {
          withCredentials: true
        }
      );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      navigate("/login");
    }
  };

  const handleLogout = async () => {

    try {

      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true
        }
      );

      navigate("/login");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif">

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

      <div className="p-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.firstName}
          </h2>

          <p className="text-gray-500 mt-2">
            Here's what's happening with your account today.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Orders
            </h3>

            <p className="text-3xl font-bold mt-2">
              12
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Wishlist
            </h3>

            <p className="text-3xl font-bold mt-2">
              5
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow">

            <h3 className="text-gray-500">
              Cart Items
            </h3>

            <p className="text-3xl font-bold mt-2">
              3
            </p>

          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow mb-10">

          <h3 className="text-xl font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-indigo-500 text-white rounded-xl"
            >
              Go to Shop
            </button>

            <button
              onClick={() => navigate("/favourites")}
              className="px-6 py-3 bg-pink-500 text-white rounded-xl"
            >
              View Wishlist
            </button>

            <button className="px-6 py-3 bg-green-500 text-white rounded-xl">
              My Orders
            </button>

          </div>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h3 className="text-xl font-semibold mb-4">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-gray-600">

            <li>
              Logged in successfully
            </li>

            <li>
              Added item to wishlist
            </li>

            <li>
              Viewed product
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;