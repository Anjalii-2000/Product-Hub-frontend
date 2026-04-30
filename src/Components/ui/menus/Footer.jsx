import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4">
            <img src={logo} alt="logo" className="h-14 object-contain" />
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed">
            High-quality products designed to make your life better. Trusted by thousands worldwide.
          </p>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            Products
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-blue-400 transition cursor-pointer">New Arrivals</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Best Sellers</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Discounts</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Categories</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            Company
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-blue-400 transition cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Careers</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Blog</li>
            <li className="hover:text-blue-400 transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 inline-block pb-1">
            Stay Updated
          </h3>

          <p className="text-gray-300 text-sm mb-4 text-center md:text-left">
            Subscribe to get special offers & updates.
          </p>

          <div className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-md bg-gray-200 text-black focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <div className="p-2 bg-gray-700 rounded-full hover:bg-blue-600 transition cursor-pointer shadow-md hover:scale-110">
              <FaFacebookF />
            </div>
            <div className="p-2 bg-gray-700 rounded-full hover:bg-sky-400 transition cursor-pointer shadow-md hover:scale-110">
              <FaTwitter />
            </div>
            <div className="p-2 bg-gray-700 rounded-full hover:bg-pink-500 transition cursor-pointer shadow-md hover:scale-110">
              <FaInstagram />
            </div>
            <div className="p-2 bg-gray-700 rounded-full hover:bg-blue-500 transition cursor-pointer shadow-md hover:scale-110">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-5 text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="text-white font-medium">YourBrand</span>. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;