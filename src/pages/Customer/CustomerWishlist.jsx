import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";
import CustomerHeader from "../../Components/Customer/CustomerHeader/CustomerHeader";
import { addToWishlist, removeFromWishlist } from "../../features/wishlist/wishlistSlice";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";
import CustomerSideBar from "../../Components/Customer/CustomerSideBar/CustomerSideBar";

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
      <CustomerSideBar customerName={customerName} handleLogout={handleLogout} />

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

              return (
                <div key={item._id} className="flex flex-col h-full">
                  <Link
                    to={`/product/${item._id}`}
                    className="relative flex-1 flex flex-col bg-gray-700 rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden border"
                  >
                    {/* Heart button to remove from wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFromWishlist(item._id);
                      }}
                      className="absolute top-3 right-3 z-10 bg-black/40 p-2 rounded-full"
                    >
                      <Heart size={22} className="fill-red-500 text-red-500" />
                    </button>

                    {/* Product Image */}
                    <div className="bg-gray-100 p-3 flex justify-center items-center h-40">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1 text-white">
                      <h2 className="font-semibold">{item.productName}</h2>
                      <p className="text-sm text-gray-300">{item.description}</p>

                      <div className="flex justify-between mt-3">
                        <span className="font-bold text-indigo-300">₹{item.price}</span>
                        <span className="text-xs bg-indigo-600 px-2 py-1 rounded text-white">
                          {item.category}
                        </span>
                      </div>

                      {/* Cart Actions */}
                      <div className="mt-4 flex gap-2">
                        <div className="flex-1">
                          {!cartItem ? (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="w-full bg-black text-white py-2 rounded-full text-sm"
                            >
                              Add To Cart
                            </button>
                          ) : (
                            <div className="w-full h-[40px] text-black border rounded-full flex justify-center items-center gap-4 bg-white">
                              <button
                                onClick={() => handleDecrease(item._id)}
                                className="font-bold px-2"
                              >
                                -
                              </button>

                              <span className="text-black px-2">{cartItem.quantity}</span>

                              <button
                                onClick={() => handleAddToCart(item)}
                                className="font-bold px-2 text-black"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleBuyNow(item)}
                          className="flex-1 bg-blue-500 text-white py-2 rounded-full text-sm"
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