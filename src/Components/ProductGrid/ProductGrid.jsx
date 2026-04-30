import React from "react";

const products = [
  {
    id: 1,
    title: "L'Oreal Professionnel Mask",
    price: 920,
    oldPrice: 990,
    discount: "7% OFF",
    rating: 4.6,
    reviews: "21.6k",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "Maybelline Colossal Bold Liner",
    price: 248,
    oldPrice: 319,
    discount: "22% OFF",
    rating: 4.5,
    reviews: "79.8k",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    title: "L'Oreal Shampoo",
    price: 750,
    oldPrice: null,
    discount: null,
    rating: 4.6,
    reviews: "29.7k",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    title: "WROGN Socks Pack",
    price: 402,
    oldPrice: 1299,
    discount: "69% OFF",
    rating: 4.4,
    reviews: "2.4k",
    image: "https://via.placeholder.com/150"
  },
];

const ProductGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-3 hover:shadow-md transition cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* RATING */}
            <div className="text-xs text-gray-600 mt-2">
              ⭐ {item.rating} | {item.reviews}
            </div>

            {/* TITLE */}
            <h3 className="text-sm font-medium text-gray-800 mt-1 line-clamp-2">
              {item.title}
            </h3>

            {/* PRICE SECTION */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="font-semibold text-gray-900">
                ₹{item.price}
              </span>

              {item.oldPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ₹{item.oldPrice}
                </span>
              )}

              {item.discount && (
                <span className="text-green-600 text-xs font-medium">
                  {item.discount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;