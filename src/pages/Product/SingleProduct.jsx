import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getproduct/${id}`);
            setProduct(response.data.data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">Error loading product.</p>;

    return (
        <div className="p-6 md:p-12">
            <Link to="/" className="text-indigo-600 underline mb-4  text-left inline-block">← Back to Home</Link>
            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded shadow">
                <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-4">
                    <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.productName} 
                        className="h-80 object-contain"
                    />
                </div>
                <div>
                    <div className="md:w-1/2 space-y-4">
                        <h1 className="text-2xl font-bold">{product.productName}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-xl font-semibold text-indigo-600">₹{product.price}</p>
                        <span className="text-sm bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">{product.category}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={(e) => handleAddToCart(e, item)}
                            className="w-auto bg-gray-100  border rounded hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 rounded-lg transition"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={(e) => handleBuyNow(e, item)}
                            className="w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleProduct;