import axios from "axios";

import type { WishList } from "../../types";
import { API_CONSTANTS } from "../../utils/constants/api";

const createWishList = async (wishlist: WishList) => {
    const response = await axios.post(
        `${API_CONSTANTS.WISHES_API_PREFIX}/create`,
        {
            wishlist: {
                title: wishlist.title,
                wishes: wishlist.wishes.map((wish) => wish.description),
            },
        },
    );

    return response.data;
};

const getAll = async () => {
    const response = await axios.get(`${API_CONSTANTS.WISHES_API_PREFIX}`);

    return response.data;
};

export const wishesApi = {
    createWishList,
    getAll,
};
