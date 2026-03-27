import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "../layouts/main";
import CreateWishlist from "../pages/CreateWishlist";
import EditWishlist from "../pages/EditWishlist";
import { MainPage } from "../pages/MainPage/MainPage";
import MyWishlists from "../pages/MyWishlists";
import { ROUTES } from "../utils/constants/routes";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route
                    path={ROUTES.CREATE_WISHLIST}
                    element={<CreateWishlist />}
                />
                <Route path={ROUTES.MY_WISHLISTS} element={<MyWishlists />} />
                <Route path={ROUTES.EDIT_WISHLIST} element={<EditWishlist />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
