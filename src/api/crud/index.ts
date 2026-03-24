import axios from "axios";

import type { WishList } from "../../types";
import { API_CONSTANTS } from "../../utils/constants/api";

const createWishList = async (wishlist: WishList) => {
    const response = await axios.post(
        `${API_CONSTANTS.WISHES_API_PREFIX}/create`,
        {
            title: wishlist.title,
            wishes: wishlist.wishes,
        },
    );

    return response.data;
};

const updateWishList = async (id: string, wishlist: WishList) => {
    const response = await axios.post(
        `${API_CONSTANTS.WISHES_API_PREFIX}/update/`,
        {
            id,
            title: wishlist.title,
            wishes: wishlist.wishes,
        },
    );

    return response.data;
};

const getAll = async (mode?: "titles" | "full") => {
    const response = await axios.get(`${API_CONSTANTS.WISHES_API_PREFIX}`, {
        params: { mode },
    });

    return response.data;
};

const getOne = async (id: string) => {
    const response = await axios.get(
        `${API_CONSTANTS.WISHES_API_PREFIX}/${id}`,
    );

    return response.data;
};

export const wishesApi = {
    getAll,
    getOne,
    createWishList,
    updateWishList,
};
