import { useEffect } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";

import authApi from "./api/auth";
import CreateWishlist from "./pages/CreateWishlist";
import EditWishlist from "./pages/EditWishlist";
import { MainPage } from "./pages/MainPage/MainPage";
import MyWishlists from "./pages/MyWishlists";
import styles from "./app.module.css";

const Layout = () => (
    <div className={styles.outlet}>
        <Link to="/">Главная</Link>
        <Outlet />
    </div>
);

const App = () => {
    useEffect(() => {
        authApi
            .me()
            .then((response) => {
                console.info(response);
            })
            .catch((error) => {
                console.error(error);
                authApi.loginAsGuest().then((response) => {
                    console.info(response);
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
                    <Route
                        path="edit-wishlist/:id"
                        element={<EditWishlist />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
