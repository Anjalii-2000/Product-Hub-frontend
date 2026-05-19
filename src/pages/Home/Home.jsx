import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../Components/ui/menus/Header";
import Slider from "../../Components/ui/menus/Slider";
import ProductData from "../../Components/ProductData/ProductData";
import Footer from "../../Components/ui/menus/Footer";


const Home = () => {
    const [getAllProduct, setAllProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [wishlist, setWishlist] = useState([]);

    const toggleWishlist = (productId) => {
        setWishlist((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = getAllProduct.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(getAllProduct.length / itemsPerPage);

    const fetchAllData = async (cat = "") => {
        try {
            setLoading(true);
            setError(false);

            const url = cat
                ? `http://localhost:3000/api/getallproduct?category=${cat}`
                : "http://localhost:3000/api/getallproduct";

            const response = await axios.get(url);

            setAllProduct(response?.data?.data || []);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        fetchAllData(category);
    }, [category]);

    return (
        <>
            <Header setCategory={setCategory} />
            <Slider />

            <div className="font-serif pt-[30px] pb-[80px] bg-gray-50 min-h-screen px-6 md:px-12">


                <ProductData
                    products={currentProducts}
                    loading={loading}
                    error={error}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                />

            </div>
            <div className="mt-16" >
                <Footer />
            </div>

        </>
    );
};

export default Home;