import { X } from "lucide-react";

export default function LoginModal({ open, onClose, onLoginClick, onRegisterClick }) {
    if (!open) return null;

    return (
        <footer className="bg-white border-t border-gray-200 mt-20">

            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block mb-5">
                            <img
                                src={logo}
                                alt="logo"
                                className="h-9 object-contain"
                            />
                        </Link>

                        <p className="text-sm text-gray-600 leading-7">
                            Discover premium quality products with fast shipping,
                            secure payments, and trusted customer support.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">

                            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                                <FaFacebookF size={13} />
                            </button>

                            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                                <FaTwitter size={13} />
                            </button>

                            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                                <FaInstagram size={13} />
                            </button>

                            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                                <FaLinkedinIn size={13} />
                            </button>

                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-5">
                            Shop
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="hover:text-black transition cursor-pointer">
                                New Arrivals
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                Best Sellers
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                Featured Products
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                Sale Collection
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-5">
                            Customer Care
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="hover:text-black transition cursor-pointer">
                                Contact Us
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                Shipping Policy
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                Returns & Refunds
                            </li>

                            <li className="hover:text-black transition cursor-pointer">
                                FAQs
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-5">
                            Newsletter
                        </h3>

                        <p className="text-sm text-gray-600 leading-7 mb-5">
                            Subscribe and get updates on new collections and special offers.
                        </p>

                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none"
                            />

                            <button className="bg-black text-white px-5 py-3 text-sm font-medium hover:bg-gray-900 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-gray-500 text-center md:text-left">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-medium text-black">
                                YourBrand
                            </span>
                            . All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="hover:text-black cursor-pointer transition">
                                Privacy Policy
                            </span>

                            <span className="hover:text-black cursor-pointer transition">
                                Terms
                            </span>

                            <span className="hover:text-black cursor-pointer transition">
                                Help Center
                            </span>
                        </div>

                    </div>

                </div>
            </div>

        </footer>
    );
}