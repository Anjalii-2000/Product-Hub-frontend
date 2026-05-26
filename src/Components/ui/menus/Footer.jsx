import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 mt-16">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="pr-4">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="logo"
                className="h-10 object-contain"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-7">
              Premium shopping experience with quality products,
              fast delivery, and trusted customer support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">

              <button className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-gray-500 transition">
                <FaFacebookF size={13} />
              </button>

              <button className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-gray-500 transition">
                <FaTwitter size={13} />
              </button>

              <button className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-gray-500 transition">
                <FaInstagram size={13} />
              </button>

              <button className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-gray-500 transition">
                <FaLinkedinIn size={13} />
              </button>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide mb-5">
              SHOP
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                New Arrivals
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Best Sellers
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Featured Products
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Sale Collection
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide mb-5">
              SUPPORT
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">
                Contact Us
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Shipping Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Returns & Refunds
              </li>

              <li className="hover:text-white cursor-pointer transition">
                FAQs
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wide mb-5">
              NEWSLETTER
            </h3>

            <p className="text-sm text-gray-400 leading-6 mb-5">
              Get updates about new collections and exclusive offers.
            </p>

            <div className="flex items-center border border-gray-700 rounded-md overflow-hidden bg-[#181818]">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />

              <button className="bg-white text-black px-5 py-3 text-sm font-medium hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

            <p className="text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-gray-200 font-medium">
                YourBrand
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </span>

              <span className="hover:text-white cursor-pointer transition">
                Terms of Service
              </span>

              <span className="hover:text-white cursor-pointer transition">
                Help Center
              </span>
            </div>

          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;