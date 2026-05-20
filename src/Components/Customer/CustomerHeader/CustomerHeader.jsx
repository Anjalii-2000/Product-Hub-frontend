import React, { useState } from "react";
import logo from "../../../assets/logo.jpeg";
import CategoryNav from "../CategoryNav/CategoryNav";

function CustomerHeader({
  customerName,
  handleLogout,
  searchTerm,
  setSearchTerm,
  setCategory,
}) {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow z-50 flex items-center justify-between px-6 py-3">

      <img
        src={logo}
        className="h-12 w-auto"
        alt="Logo"
      />

      <div className="flex items-center gap-4">

        {/* SEARCH */}
        {setSearchTerm && (
          <input
            type="text"
            placeholder="Search products or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 w-72"
          />
        )}

        {/* CATEGORY */}
        {setCategory && (
          <CategoryNav setCategory={setCategory} />
        )}

      </div>

      <div className="relative">

        <div
          onClick={() => setShowMenu(!showMenu)}
          className="font-semibold text-gray-700 cursor-pointer"
        >
          Welcome, {customerName} ▼
        </div>

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
  );
}

export default CustomerHeader;