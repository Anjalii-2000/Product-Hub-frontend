import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductData from "../../Components/ProductData/ProductData";
import logo from "../../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const [getAllProduct, setAllProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const customerName = storedUser?.firstName || "Customer";

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = getAllProduct.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(getAllProduct.length / itemsPerPage);

  const fetchProducts = async (cat = "") => {
    try {
      setLoading(true);
      setError(false);

      const url = cat
        ? `http://localhost:3000/api/getallproduct?category=${cat}`
        : "http://localhost:3000/api/getallproduct";

      const res = await axios.get(url);
      setAllProduct(res?.data?.data || []);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(category);
  }, [category]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif relative">

      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

        <img src={logo} className="h-15 w-auto" />

        {/* CATEGORY MENU */}
        <div className="hidden md:flex gap-6 text-xl font-medium">
          <button onClick={() => setCategory("")} className="font-bold hover:text-indigo-600">All</button>
          <button onClick={() => setCategory("Electronics")} className=" font-bold hover:text-indigo-600">Electronics</button>
          <button onClick={() => setCategory("Clothing")} className="font-bold hover:text-indigo-600">Clothing</button>
          <button onClick={() => setCategory("Food")} className="font-bold hover:text-indigo-600">Food</button>
          <button onClick={() => setCategory("Books")} className="font-bold hover:text-indigo-600">Books</button>
        </div>

        {/* USER MENU */}
        <div className="relative flex items-center gap-6">

          <div className="text-pink-500 font-medium cursor-pointer">
            ❤️ Wishlist
          </div>

          <div className="relative">
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="font-semibold text-gray-700 cursor-pointer select-none"
            >
              {customerName} ▼
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
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
      </div>


      <div className="flex pt-16">


        <div className="w-64 bg-white h-screen p-6 shadow border-r fixed">

          <h2 className="font-bold text-xl text-black mb-6">{customerName}</h2>

          <ul className="space-y-2 text-sm">

            <li className="px-4 py-2 rounded-lg text-bold  text-xl hover:bg-gray-100 cursor-pointer">
              Wishlist
            </li>

            <li className="px-4 py-2 rounded-lg text-bold text-xl hover:bg-gray-100 cursor-pointer">
              My Orders
            </li>

            <li className="px-4 py-2 rounded-lg text-bold  text-xl hover:bg-gray-100 cursor-pointer">
              Cart
            </li>
            <li className="px-4 py-2 rounded-lg text-bold text-xl hover:bg-gray-100 cursor-pointer">
              Profile
            </li>

            <li
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-xl text-bold text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Logout
            </li>

          </ul>

        </div>


        <div className="flex-1  col- 5 ml-64 p-6 space-y-8">


          <div className="pt-6">
            <ProductData
              products={currentProducts}
              loading={loading}
              error={error}
            />
          </div>
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">

              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Customer;
