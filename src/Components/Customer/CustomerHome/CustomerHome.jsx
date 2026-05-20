import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomerProduct from "../products/CustomerProduct";


const BASE_URL = "http://localhost:3000";

function CustomerHome() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [getAllProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    // Debounce Search
    useEffect(() => {

        const handler = setTimeout(() => {

            setDebouncedSearch(searchTerm);

        }, 500);

        return () => clearTimeout(handler);

    }, [searchTerm]);


    // Fetch User
    useEffect(() => {

        const fetchUser = async () => {

            try {

                const res = await axios.get(
                    `${BASE_URL}/api/me`,
                    {
                        withCredentials: true
                    }
                );

                setUser(res.data.user);

            }
            catch {

                setUser(null);

            }

        };

        fetchUser();

    }, []);


    const customerName =
        user?.firstName || "Customer";


    // Logout
    const handleLogout = async () => {

        try {

            await axios.post(
                `${BASE_URL}/api/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            navigate("/login");

        }
        catch (error) {

            console.log(error);

        }

    };

    // Fetch Products
    const fetchProducts = async (
        cat = "",
        search = ""
    ) => {

        try {

            setLoading(true);
            setError(false);

            const params =
                new URLSearchParams();

            if (cat) {

                params.append(
                    "category",
                    cat
                );

            }

            if (search) {

                params.append(
                    "searchTerm",
                    search
                );

            }

            const queryString =
                params.toString();

            const url =
                queryString
                    ? `${BASE_URL}/api/getallproduct?${queryString}`
                    : `${BASE_URL}/api/getallproduct`;

            const res =
                await axios.get(url);

            setAllProduct(
                res.data.data || []
            );

        }
        catch (error) {

            console.log(error);

            setError(true);

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        setCurrentPage(1);

        fetchProducts(
            category,
            debouncedSearch
        );

    }, [
        category,
        debouncedSearch
    ]);


    const indexOfLast =
        currentPage * itemsPerPage;

    const indexOfFirst =
        indexOfLast - itemsPerPage;

    const currentProducts =
        getAllProduct.slice(
            indexOfFirst,
            indexOfLast
        );

    const totalPages =
        Math.ceil(
            getAllProduct.length /
            itemsPerPage
        );



    return (

        <div className="min-h-screen bg-gray-100">
            <div className="flex-1 p-6">

                <CustomerProduct
                    products={currentProducts}
                    loading={loading}
                    error={error}
                />
                {/* Pagination */}

                <div className="flex justify-center gap-3 mt-8">

                    <button
                        onClick={() =>
                            setCurrentPage(
                                prev => prev - 1
                            )
                        }

                        disabled={
                            currentPage === 1
                        }

                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Previous
                    </button>


                    {[...Array(totalPages)].map(
                        (_, index) => (

                            <button
                                key={index}

                                onClick={() =>
                                    setCurrentPage(
                                        index + 1
                                    )
                                }

                                className={`w-10 h-10 rounded-full ${currentPage === index + 1
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white border"
                                    }`}
                            >

                                {index + 1}

                            </button>

                        )
                    )}


                    <button
                        onClick={() =>
                            setCurrentPage(
                                prev => prev + 1
                            )
                        }

                        disabled={
                            currentPage === totalPages
                        }

                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Next
                    </button>
                </div>

            </div>

        </div >

    );

}

export default CustomerHome;