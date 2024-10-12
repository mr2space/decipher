import React from "react";
import { pages } from "./pages";
import { components } from "./components";
import { Routes, Route } from "react-router-dom";
import { URL } from "./data";
const App = () => {
    return (
        <>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<pages.Home />} />
                <Route
                    path={URL.LOGIN_URL}
                    element={<pages.ComponentsPage />}
                />
                <Route element={<components.PersistantLogin />}>
                    <Route element={<components.RequiredAuth />}>
                        <Route
                            path={"/secure"}
                            element={<pages.SecurePage />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default App;
