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

    const currentProducts =
        getAllProduct.slice(indexOfFirst, indexOfLast);

    const fetchAllData = async (cat = "") => {
        try {
            console.log("API function called");

            setLoading(true);
            setError(false);

            const url = cat
                ? `http://localhost:3000/api/getallproduct?category=${cat}`
                : `http://localhost:3000/api/getallproduct`;

            console.log(url);

            const response = await axios.get(url);

            console.log(response.data);

            setAllProduct(response?.data?.data || []);

        } catch (err) {
            console.log(err);
            setError(true);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData(category);
        setCurrentPage(1);
    }, [category]);

    return (
        <>
            <Header setCategory={setCategory} />
            <Slider />

            <ProductData
                products={currentProducts}
                loading={loading}
                error={error}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
            />

            <Footer />
        </>
    );
};

export default Home;