import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";
import CustomerHeader from "../../Components/Customer/CustomerHeader/CustomerHeader";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";

const BASE_URL = "http://localhost:3000";

function CustomerWishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const [user, setUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/me`, { withCredentials: true });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const customerName = user?.firstName || "Customer";

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleBuyNow = (item) => {
    dispatch(addToCart(item));
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <CustomerHeader
        customerName={customerName}
        handleLogout={handleLogout}
      />
      {/* Sidebar */}


      {/* Main Wishlist Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center mt-20 text-gray-500 text-lg font-semibold">
            Your wishlist is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {wishlistItems.map((item) => {
              const cartItem = cartItems.find(
                (product) => String(product._id) === String(item._id)
              );

              const isWishlisted = true; // (kept logic assumption same as yours if already defined)

              return (
                <div key={item._id} className="flex flex-col h-full">
                  <Link
                    to={`/product/${item._id}`}
                    className="relative flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                  >

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFromWishlist(item._id);
                      }}
                      className="absolute top-3 right-3 z-10 bg-white border border-gray-200 p-2 rounded-full shadow-sm"
                    >
                      <Heart size={20} className="fill-red-500 text-red-500" />
                    </button>

                    {/* Product Image */}
                    <div className="bg-gray-50 p-5 flex justify-center items-center h-52">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1 flex flex-col">

                      <h2 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {item.productName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <span className="font-semibold text-lg text-gray-900">
                          ₹{item.price}
                        </span>

                        <span className="text-xs border border-gray-300 px-2 py-1 rounded-full text-gray-600">
                          {item.category}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex gap-2">

                        <div className="flex-1">
                          {!cartItem ? (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <div className="w-full h-[42px] border border-gray-300 rounded-full flex justify-center items-center gap-4 bg-white">
                              <button
                                onClick={() => handleDecrease(item._id)}
                                className="font-semibold px-2 text-gray-700"
                              >
                                -
                              </button>

                              <span className="text-gray-900 text-sm">
                                {cartItem.quantity}
                              </span>

                              <button
                                onClick={() => handleAddToCart(item)}
                                className="font-semibold px-2 text-gray-700"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleBuyNow(item)}
                          className="flex-1 border border-black text-black py-2.5 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
                        >
                          Buy Now
                        </button>

                      </div>

                    </div>

                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerWishlist;