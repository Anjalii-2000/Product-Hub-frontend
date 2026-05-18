import React, { useState, useEffect, useRef } from 'react';
import Image from "../../assets/Images/Image.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3000/api";

const RegisterPage = () => {

  const navigate = useNavigate();
  const nameRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
    phone: ""
  });

  const isFormValid =
    formData.firstName.trim() &&
    formData.email.trim() &&
    formData.password.trim() &&
    formData.phone.trim() &&
    formData.role;

  const handleChange = (event) => {

    const { name, value } = event.target;

    let errorMsg = "";

    if (name === "firstName") {
      if (value.length > 15) {
        errorMsg = "First name must be less than 15 characters";
      }
    }

    if (name === "email") {
      if (!value.includes("@")) {
        errorMsg = "Enter valid email";
      }
    }

    if (name === "password") {
      if (value.length <= 6) {
        errorMsg = "Password should be at least 6 characters";
      }
    }

    if (name === "phone") {
      if (value.length !== 10) {
        errorMsg = "Enter valid phone number";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError((prev) => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const handleClick = async (e) => {

    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select role");
      return;
    }

    try {

      const response = await axios.post(
        `${API_URL}/register`,
        formData,
        {
          withCredentials: true
        }
      );

      toast.success(
        response.data.message || "Registered Successfully"
      );

      setTimeout(() => {

        if (formData.role === "seller") {
          navigate("/dashboard/seller");
        } else {
          navigate("/dashboard/customer");
        }

      }, 1000);

      setFormData({
        firstName: "",
        email: "",
        password: "",
        phone: "",
        role: ""
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen text-gray-700 flex flex-col md:flex-row font-serif bg-gradient-to-br from-gray-50 to-gray-100">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">

        <img
          src={Image}
          alt="Register"
          className="w-[500px] md:w-[650px] object-contain"
        />

      </div>

      <div className="w-full md:w-1/2 font-serif flex items-center justify-center p-6">

        <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">

          <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-transparent bg-clip-text tracking-wide">
            Create Your Account
          </h2>

          <form className="space-y-6">

            {/* FIRST NAME */}
            <div className="flex text-black flex-col">

              <label className="mb-2 text-left text-sm font-semibold text-black">
                First Name
              </label>

              <input
                ref={nameRef}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />

              <p className="text-red-500 text-left text-sm mt-1">
                {error.firstName}
              </p>

            </div>

            {/* EMAIL */}
            <div className="flex flex-col">

              <label className="mb-2 text-left text-sm font-semibold text-black">
                Email Address
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />

              <p className="text-red-500 text-left text-sm mt-1">
                {error.email}
              </p>

            </div>

            {/* PASSWORD */}
            <div className="flex flex-col">

              <label className="mb-2 text-left text-sm font-semibold text-black">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />

              <p className="text-red-500 text-left text-sm mt-1">
                {error.password}
              </p>

            </div>

            {/* PHONE */}
            <div className="flex flex-col">

              <label className="mb-2 text-left text-sm font-semibold text-black">
                Phone Number
              </label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />

              <p className="text-red-500 text-left text-sm mt-1">
                {error.phone}
              </p>

            </div>

            {/* ROLE SELECTION */}
            <div className="flex flex-col">

              <label className="mb-2 text-left  text-sm font-semibold text-black">
                Select Account Type
              </label>

              <div className="flex gap-4">

                {/* CUSTOMER */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: "customer"
                    }))
                  }
                  className={`w-full py-3 rounded-xl text-black font-semibold transition-all duration-300 border
        ${formData.role === "customer"
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105"
                    }`}
                >
                  Customer
                </button>

                {/* SELLER */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: "seller"
                    }))
                  }
                  className={`w-full py-3 text-black rounded-xl font-semibold transition-all duration-300 border
        ${formData.role === "seller"
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105"
                    }`}
                >
                  Seller
                </button>

              </div>

            </div>

            {/* SUBMIT */}
            <button
              onClick={handleClick}
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200
          ${isFormValid
                  ? "bg-purple-600 text-white hover:bg-purple-700 hover:scale-[1.02]"
                  : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
              Sign Up
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;