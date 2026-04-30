import React, { useContext } from 'react'
import { FavouriteContext } from '../../Context/FavouriteContext';
import { Link } from "react-router";


const Favourties = () => {
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  return (
    <div className=" font-serif bg-gray-50 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Wishlist ❤️
      </h1>

      {favourites.length === 0 ? (
        <p className="text-gray-600 text-lg">No favourite items yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {favourites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden group"
            >

              <div className="h-[200px] flex items-center justify-center bg-gray-100 relative">
                <Link to={`/productdetailpage/${item.id}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-[160px] object-contain group-hover:scale-105 transition duration-300"
                  /></Link>
                <button
                  onClick={() => toggleFavourite(item)}
                  className="absolute top-2 right-2 text-2xl text-red-500"
                >
                  ❤️
                </button>
              </div>
              <div className="p-4">

                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-sm mt-2">
                  {item.rating} ⭐
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${item.price}
                  </span>
                </div>

                <p className="text-xs text-gray-500 uppercase mt-2">
                  {item.category}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default Favourties;