import React, { useState, useEffect } from 'react';
import Image from "../../assets/Images/Image.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  console.log(formData, "formmmm")
  const isFormValid = formData.firstName.trim() && formData.email.trim() && formData.password.trim() && formData.phone.trim() && formData.role;;


  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
    phone: ""
  });

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
        errorMsg = "Enter a valid email";
      }
    }

    if (name === "password") {
      if (value.length <= 6) {
        errorMsg = "Password should be at least 6 characters";
      }
    }

    if (name === "phone") {
      if (value.length !== 10) {
        errorMsg = "Enter a valid phone number";
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: errorMsg }));
  };
    
  const handleClick = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role ");
      return;
    }
    if (
      !formData.firstName ||
      !formData.email ||
      formData.password.length <= 6 ||
      formData.phone.length !== 10
    ) {
      toast.error("Please fill all fields correctly ");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/register`,
        formData,
      );
      const { token, user, message, role } = response.data;

      localStorage.setItem("token", token);
      const { password, ...safeData } = user;

      localStorage.setItem("user", JSON.stringify(user));

      navigate(`/dashboard/${formData.role}`);

      localStorage.setItem("userData", JSON.stringify(safeData));

      toast.success(response.data.message || "Registered Successfully ");


      setFormData({
        firstName: "",
        email: "",
        password: "",
        phone: ""
      });

      setError({
        firstName: "",
        email: "",
        password: "",
        phone: ""
      });

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed ");
      } else {
        toast.error("Network or server error ");
        console.log("Network error:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
      return;
    }


    const savedData = localStorage.getItem("userData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setFormData({
        firstName: parsedData.firstName || "",
        email: parsedData.email || "",
        password: "",
        phone: parsedData.phone || ""
      });
    }

  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-serif bg-gradient-to-br from-gray-50 to-gray-100">

      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="relative">
          <div className="absolute inset-0 bg-white blur-3xl opacity-30 rounded-full"></div>
          <img
            src={Image}
            alt="Register"
            className="relative w-[500px] md:w-[650px] object-contain"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-lg p-10 bg-white rounded-2xl shadow-xl border border-gray-200">

          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Create Your Account
          </h2>

          <form className="space-y-6">

            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />
              <p className="text-red-500 text-sm mt-1 text-left">{error.firstName}</p>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />
              <p className="text-red-500 text-sm mt-1 text-left">{error.email}</p>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />
              <p className="text-red-500 text-left text-sm mt-1">{error.password}</p>
            </div>


            <div className="flex flex-col">
              <label className="mb-1 text-left text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              />
              <p className="text-red-500 text-left text-sm mt-1">{error.phone}</p>
            </div>


            <div className="flex flex-col">
              <label className="mb-2 text-left text-sm font-semibold text-gray-700">
                Select Account Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, role: "customer" }));
                  }}
                  className="w-full py-2 rounded-lg border border-indigo-400 text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, role: "seller" }));


                  }}
                  className="w-full py-2 rounded-lg border border-green-400 text-green-600 hover:bg-green-500 hover:text-white transition"
                >
                  Seller
                </button>
              </div>
            </div>


            <button
              onClick={handleClick}
              type="submit"
              disabled={!isFormValid}
              className={`w-full mt-2 py-3 rounded-lg bg-purple-500 font-semibold transition duration-300 shadow-md
    ${isFormValid
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-[1.02] hover:shadow-lg"
                  : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
              Sign Up
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-9">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-semibold hover:underline">
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