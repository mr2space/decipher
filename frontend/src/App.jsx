import React from "react";
import { pages } from "./pages";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <>
            
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<pages.Home />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
