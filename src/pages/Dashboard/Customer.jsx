import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerSideBar from "../../Components/Customer/CustomerSideBar/CustomerSideBar";
import CustomerHeader from "../../Components/Customer/CustomerHeader/CustomerHeader";
import Footer from "../../Components/ui/menus/Footer";
import { Outlet, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

function Customer() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");



    // Fetch logged in user
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
            catch (error) {

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



    return (

        <div className="min-h-screen bg-gray-100 font-serif">

            {/* Header */}

            <CustomerHeader
                customerName={customerName}
                handleLogout={handleLogout}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setCategory={setCategory}
            />


            {/* Main layout */}

            <div className="pt-20 flex">

                {/* Sidebar */}

                <CustomerSideBar
                    customerName={customerName}
                    handleLogout={handleLogout}
                />


                {/* Dynamic pages */}

                <div className="flex-1 p-6">

                    <Outlet
                        context={{
                            searchTerm,
                            category
                        }}
                    />

                </div>

            </div>

            <Footer />

        </div>

    );

}

export default Customer;