import React, { useEffect, useState } from "react";
import { components } from "../../components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";

const SecurePage = () => {
    const [data, setData] = useState("");

    const axiosprivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const refresh = useRefreshToken();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getLocation = async () => {
            try {
                const response = await axiosprivate.get("/dev/all",{
                    signal: controller.signal,
                });
                // response.data = response.data.data;
                if (isMounted) {
                    const data = response.data?.data; // Assuming the response has a 'data' field
                    setData(JSON.stringify(data)); // Only update state if component is still mounted
                }
            } catch (error) {
              // TODO: Fixed the Cancell error
                if (error.name === "AbortError") {
                    // Handle the abort error quietly
                    console.log("Request was canceled" , error);
                } else {
                    // Handle other errors (network error, etc.)
                    console.error("Error fetching data:", error);
                    navigate(URL.LOGIN_URL, {
                        state: { from: location },
                        replace: true,
                    });
                }
            }
        };

        getLocation();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <section className="w-full h-screen bg-whitegray overflow-x-hidden flex flex-col gap-10 justify-center items-center">
            <components.Navbar />
            <div className="flex justify-center items-center">
                {data || "just working ..."}
            </div>
        </section>
    );
};

export default SecurePage;
