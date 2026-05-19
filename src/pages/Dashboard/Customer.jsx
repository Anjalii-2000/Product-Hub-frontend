import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerProduct from "../../Components/Customer/products/CustomerProduct";
import CustomerSideBar from "../../Components/Customer/CustomerSideBar/CustomerSideBar";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../Components/ui/menus/Footer";
import CategoryNav from "../../Components/Customer/CategoryNav/CategoryNav";

const BASE_URL = "http://localhost:3000";

const Customer = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [showMenu, setShowMenu] = useState(false);

  const [getAllProduct, setAllProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);

  const itemsPerPage = 10;
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);



  // GET USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/me`, {
          withCredentials: true,
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

  const fetchProducts = async (cat = "", search = "") => {
    try {
      setLoading(true);
      setError(false);

      const params = new URLSearchParams();

      if (cat) {
        params.append("category", cat);
      }

      if (search) {
        params.append("searchTerm", search);
      }

      const queryString = params.toString();
      const url = queryString
        ? `${BASE_URL}/api/getallproduct?${queryString}`
        : `${BASE_URL}/api/getallproduct`;

      console.log("URL:", url);

      const res = await axios.get(url);

      setAllProduct(res.data.data || []);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(category, debouncedSearch);
  }, [category, searchTerm]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/logout`,
        {},
        {
          withCredentials: true,
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
        <img src={logo} className="h-12 w-auto" alt="Logo" />

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search products or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 w-72"
          />

          <CategoryNav setCategory={setCategory} />
        </div>

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
        <CustomerSideBar customerName={customerName} handleLogout={handleLogout} />

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-6">
          <CustomerProduct
            products={currentProducts}
            loading={loading}
            error={error}
          />

          {/* PAGINATION */}
          <div className="flex justify-center items-center mt-10 mb-6 gap-3">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-md"
                }`}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${currentPage === index + 1
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white scale-110 shadow-lg"
                    : "bg-white border hover:bg-purple-100"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-md"
                }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Customer;