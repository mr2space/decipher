import React from "react";
import { pages } from "./pages";
import { components } from "./components";
import { Routes, Route } from "react-router-dom";
import { URL } from "./data";
const App = () => {
    return (
        <>
            <section className="w-full h-screen bg-whitegray overflow-x-hidden flex flex-col gap-10 justify-center items-center">
                <components.Navbar />
                <Routes>
                    {/* public routes */}
                    <Route path="/text" element={<pages.ComponentsPage />} />
                    <Route path={URL.LOGIN_URL} element={<pages.Login />} />
                    <Route element={<components.PersistantLogin />}>
                        <Route path="/" element={<pages.Home />} />
                        <Route element={<components.RequiredAuth />}>
                            <Route
                                path={"/secure"}
                                element={<pages.SecurePage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </section>
        </>
    );
};

export default App;
