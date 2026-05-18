import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerProduct from "../../Components/Customer/products/CustomerProduct";
import logo from "../../assets/logo.jpeg";
import { ShoppingCart } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../Components/ui/menus/Footer";

const BASE_URL = "http://localhost:3000";

const Customer = () => {

  const navigate = useNavigate();
  const { cartItems } = useSelector(
    (state) => state.cart
  )
  const [showMenu, setShowMenu] = useState(false);

  const [getAllProduct, setAllProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);


  const itemsPerPage = 8;

  // GET USER
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const res = await axios.get(
          `${BASE_URL}/api/me`,
          {
            withCredentials: true
          }
        );

        setUser(res.data.user);

      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();

  }, []);

  const customerName = user?.firstName || "Customer";

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = getAllProduct.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    getAllProduct.length / itemsPerPage
  );

  const fetchProducts = async (cat = "") => {
    try {

      setLoading(true);
      setError(false);

      const url = cat
        ? `${BASE_URL}/api/getallproduct?category=${cat}`
        : `${BASE_URL}/api/getallproduct`;

      const res = await axios.get(url);

      setAllProduct(res?.data?.data || []);

    } catch (err) {
      setError(true);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(category);

  }, [category]);

  const handleLogout = async () => {
    try {

      await axios.post(
        `${BASE_URL}/api/logout`,
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

      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

        <img
          src={logo}
          className="h-12 w-auto"
          alt=""
        />

        <div className="relative">

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="font-semibold text-gray-700 cursor-pointer"
          >
            Welcome, {customerName} ▼
          </div>

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>


      {/* MAIN SECTION */}
      <div className="pt-20 flex">

        {/* SIDEBAR */}
        <div className="w-64 min-h-screen bg-white shadow-lg p-6">

          {/* PROFILE */}
          <div className="flex flex-col items-center border-b pb-5">

            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl">

              {customerName.charAt(0)}

            </div>

            <h2 className="mt-3 text-lg font-bold">
              {customerName}
            </h2>

          </div>


          {/* MENU */}
          <div className="mt-6 flex flex-col gap-3">

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-100"
            >
              ✏️ Edit Profile
            </button>

            <button
              onClick={() => navigate("/dashboard/customer/customercart")}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400 hover:bg-indigo-100 transition"
            >

              <ShoppingCart size={18} />

              <span className="text-sm">
                Cart
              </span>

              {
                cartItems.length > 0 && (

                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">

                    {cartItems.length}

                  </span>

                )
              }

            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-100"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-100"
            >
              🚪 Logout
            </button>

          </div>

        </div>


        {/* RIGHT CONTENT */}
        <div className="flex-1 p-6">


          {/* <div className="flex flex-wrap gap-4 mb-8">

            <button
              onClick={() => setCategory("")}
              className="px-4 py-2 bg-white rounded-lg shadow"
            >
              All
            </button>

            <button
              onClick={() => setCategory("Electronics")}
              className="px-4 py-2 bg-white rounded-lg shadow"
            >
              Electronics
            </button>

            <button
              onClick={() => setCategory("Clothing")}
              className="px-4 py-2 bg-white rounded-lg shadow"
            >
              Clothing
            </button>

            <button
              onClick={() => setCategory("Food")}
              className="px-4 py-2 bg-white rounded-lg shadow"
            >
              Food
            </button>

            <button
              onClick={() => setCategory("Books")}
              className="px-4 py-2 bg-white rounded-lg shadow"
            >
              Books
            </button>

          </div> */}



          <CustomerProduct
            products={currentProducts}
            loading={loading}
            error={error}
          />

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default Customer;