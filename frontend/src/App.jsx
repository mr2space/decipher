import React from "react";
import { pages } from "./pages";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import RequiredAuth from "./components/Auth/RequiredAuth";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/login" element={<pages.ComponentsPage />} />
                    <Route element={<RequiredAuth />}>
                        <Route path="" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
