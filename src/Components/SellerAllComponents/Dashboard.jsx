import React from "react";

export default function Dashboard({ products }) {

    const electronicsCount = products.filter(
        (item) => item.category === "Electronics"
    ).length;

    const foodCount = products.filter(
        (item) => item.category === "Food"
    ).length;

    const booksCount = products.filter(
        (item) => item.category === "Books"
    ).length;

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Total Products</p>
                    <h2>{products.length}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Electronics</p>
                    <h2>{electronicsCount}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Food</p>
                    <h2>{foodCount}</h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <p>Books</p>
                    <h2>{booksCount}</h2>
                </div>

            </div>
        </div>
    );
}