import React from "react";
import { pages } from "./pages";
import { components } from "./components";
import { Routes, Route } from "react-router-dom";
import { URL } from "./data";
const App = () => {
    return (
        <>

                <components.Navbar />
                <Routes>
                    {/* public routes */}
                    <Route path="/text" element={<pages.ComponentsPage />} />
                    <Route path={URL.LOGIN_URL} element={<pages.Login />} />
                    <Route element={<components.PersistantLogin />}>
                        <Route path="/" element={<pages.Home />} />
                        <Route element={<components.RequiredAuth />}>
                        <Route path={URL.SPECIES_SEARCH_URL}  element={<pages.Search />}/>
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
