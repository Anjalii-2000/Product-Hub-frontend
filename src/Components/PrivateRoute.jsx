import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const PrivateRoute = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {

        const checkAuth = async () => {
            try {
                await axios.get(
                    `${BASE_URL}/api/me`,
                    {
                        withCredentials: true
                    }
                );

                setIsAuthenticated(true);

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;