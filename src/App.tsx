import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import authApi from "./api/auth";
import CreateWishlist from "./pages/CreateWishlist";
import { MainPage } from "./pages/MainPage/MainPage";
import MyWishlists from "./pages/MyWishlists";
import styles from "./app.module.css";

const Layout = () => (
    <div className={styles.outlet}>
        <Outlet />
    </div>
);

const App = () => {
    useEffect(() => {
        authApi
            .me()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                authApi.loginAsGuest().then((response) => {
                    console.log(response);
                });
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="create" element={<CreateWishlist />} />
                    <Route path="my-wishlists" element={<MyWishlists />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
