import React, { useState } from 'react';
import Image from "../../assets/Images/Image.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:3000/api";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

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
    <div className="min-h-screen flex flex-col md:flex-row font-serif bg-gradient-to-br from-gray-50 to-gray-100">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">

        <img
          src={Image}
          alt="Register"
          className="w-[500px] md:w-[650px] object-contain"
        />

      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">

        <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-xl border border-gray-200">

          <h2 className="text-4xl font-bold text-center mb-8">
            Create Your Account
          </h2>

          <form className="space-y-6">

            <div className="flex flex-col">

              <label className="mb-1 text-left text-sm font-semibold">
                First Name
              </label>

              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 text-black border rounded-lg"
              />

              <p className="text-red-500 text-sm mt-1">
                {error.firstName}
              </p>

            </div>

            <div className="flex flex-col">

              <label className="mb-1 text-left text-sm font-semibold">
                Email Address
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-3 text-black border rounded-lg"
              />

              <p className="text-red-500 text-sm mt-1">
                {error.email}
              </p>

            </div>

            <div className="flex flex-col">

              <label className="mb-1 text-left text-sm font-semibold">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 text-black border rounded-lg"
              />

              <p className="text-red-500 text-sm mt-1">
                {error.password}
              </p>

            </div>

            <div className="flex flex-col">

              <label className="mb-1 text-left text-sm font-semibold">
                Phone Number
              </label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 text-black border rounded-lg"
              />

              <p className="text-red-500 text-sm mt-1">
                {error.phone}
              </p>

            </div>

            <div className="flex flex-col">

              <label className="mb-2 text-left text-sm font-semibold">
                Select Account Type
              </label>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      role: "customer"
                    }));
                  }}
                  className="w-full py-2 rounded-lg border"
                >
                  Customer
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      role: "seller"
                    }));
                  }}
                  className="w-full py-2 rounded-lg border"
                >
                  Seller
                </button>

              </div>

            </div>

            <button
              onClick={handleClick}
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-lg
              ${isFormValid
                  ? "bg-purple-500 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
              Sign Up
            </button>

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