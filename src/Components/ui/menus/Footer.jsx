import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0d0d0d] text-gray-400 mt-16">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/8">

          {/* Brand */}
          <div className="lg:pr-8">
            <Link to="/" className="inline-block mb-5">
              <img
                src={logo}
                alt="logo"
                className="h-10 object-contain"
              />
            </Link>

            <p className="text-[13px] text-gray-500 leading-[1.85] mb-6">
              Premium shopping experience with quality products,
              fast delivery, and trusted customer support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-gray-500">
                <FaFacebookF size={12} />
              </button>
              <button className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-gray-500">
                <FaTwitter size={12} />
              </button>
              <button className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-gray-500">
                <FaInstagram size={12} />
              </button>
              <button className="w-8 h-8 border border-white/10 rounded-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-200 text-gray-500">
                <FaLinkedinIn size={12} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-[11px] font-bold tracking-[0.14em] uppercase mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                New Arrivals
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Best Sellers
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Featured Products
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Sale Collection
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-[11px] font-bold tracking-[0.14em] uppercase mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Contact Us
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Shipping Policy
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                Returns & Refunds
              </li>
              <li className="text-[13px] text-gray-500 hover:text-white cursor-pointer transition-colors duration-150">
                FAQs
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-[11px] font-bold tracking-[0.14em] uppercase mb-5">
              Newsletter
            </h3>

            <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
              Get updates about new collections and exclusive offers.
            </p>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white/25 transition-colors duration-200"
              />
              <button className="w-full bg-white text-black py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-[12px] text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-medium">YourBrand</span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-[12px] text-gray-600 hover:text-white cursor-pointer transition-colors duration-150">
              Privacy Policy
            </span>
            <span className="text-[12px] text-gray-600 hover:text-white cursor-pointer transition-colors duration-150">
              Terms of Service
            </span>
            <span className="text-[12px] text-gray-600 hover:text-white cursor-pointer transition-colors duration-150">
              Help Center
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;