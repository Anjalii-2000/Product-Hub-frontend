import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "../../assets/Images/Image.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3000/api";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const isFormValid =
    formData.email.trim().length > 0 &&
    formData.password.trim().length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        formData
      );

      const { token, user, message } = response.data;

      // safety check
      if (!token || !user) {
        toast.error("Invalid response from server");
        return;
      }

      // save data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Login Successful");

      // safe redirect
      setTimeout(() => {
        if (user?.role === "seller") {
          navigate("/dashboard/seller");
        } else if (user?.role === "customer") {
          navigate("/dashboard/customer");
        } else {
          toast.error("Invalid user role");
        }
      }, 1000);

    } catch (error) {
      console.log("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    }
  };

  // ✅ AUTO LOGIN FIXED
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user?.role) {
      if (user.role === "seller") {
        navigate("/dashboard/seller");
      } else if (user.role === "customer") {
        navigate("/dashboard/customer");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex font-serif bg-white">

      <ToastContainer position="top-right" autoClose={2000} />

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-10">
        <img
          src={Image}
          alt="Login"
          className="w-[600px] object-contain"
        />
      </div>

      {/* FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">

        <div className="w-full max-w-xl p-10 bg-white rounded-2xl shadow-xl border">

          <h2 className="text-4xl font-bold text-center mb-8 text-purple-600">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block mb-2  text-left  text-black  font-medium">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2  text-left text-black font-medium">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${isFormValid
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              Login
            </button>

            {/* LINK */}
            <p className="text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;