import React from "react";

export default function Dashboard({ products }) {

    const electronicsCount = products.filter(
        (item) => item.category === "Electronic"
    ).length;

    const foodCount = products.filter(
        (item) => item.category === "Food"
    ).length;
    const clothingCount = products.filter(
        (item) => item.category === "Clothing"
    ).length;

    const booksCount = products.filter(
        (item) => item.category === "Book"
    ).length;

    return (
        <div className="p-6">

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">
                        Total Products
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                        {products.length}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">
                        Electronic
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                        {electronicsCount}
                    </h2>
                </div>


                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">
                        Clothing
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                        {clothingCount}
                    </h2>
                </div>


                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">
                        Food
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                        {foodCount}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition">
                    <p className="text-sm text-gray-500">
                        Book

                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
                        {booksCount}
                    </h2>
                </div>

            </div>

        </div>
    );
}