import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductData from "../../Components/ProductData/ProductData";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/ui/menus/Footer";

const BASE_URL = "http://localhost:3000";

const Customer = () => {

  const navigate = useNavigate();

  const [getAllProduct, setAllProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const itemsPerPage = 8;

  // GET USER FROM COOKIE
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/me`, {
          withCredentials: true
        });

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
  const currentProducts = getAllProduct.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(getAllProduct.length / itemsPerPage);

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
      await axios.post(`${BASE_URL}/api/logout`, {}, {
        withCredentials: true
      });

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif">

      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

        <img src={logo} className="h-12 w-auto" />

        {/* CATEGORY */}
        <div className="hidden md:flex gap-6 text-lg font-medium">

          <button onClick={() => setCategory("")}>All</button>

          <button onClick={() => setCategory("Electronics")}>
            Electronics
          </button>

          <button onClick={() => setCategory("Clothing")}>
            Clothing
          </button>

          {/* ✅ FIXED HERE */}
          <button onClick={() => setCategory("Food")}>
            Food
          </button>

          <button onClick={() => setCategory("Books")}>
            Books
          </button>

        </div>

        {/* PROFILE */}
        <div className="relative flex items-center gap-6">

          <div
            onClick={() => navigate("/wishlist")}
            className="text-pink-500 cursor-pointer"
          >
            ❤️ Wishlist
          </div>

          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full cursor-pointer"
          >
            {customerName.charAt(0)}
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 top-14 w-52 bg-white border rounded-xl shadow-xl">

              <button onClick={() => navigate("/wishlist")} className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                Wishlist
              </button>

              <button onClick={() => navigate("/cart")} className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                Cart
              </button>

              <button onClick={() => navigate("/orders")} className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                My Orders
              </button>

              <button onClick={() => navigate("/profile")} className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-red-600 hover:bg-red-50 border-t"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-20 p-6">

        <ProductData
          products={currentProducts}
          loading={loading}
          error={error}
        />

      </div>

      <Footer />
    </div>
  );
};

export default Customer;