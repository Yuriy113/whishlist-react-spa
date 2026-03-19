import axios from "axios";

import { API_CONSTANTS } from "../../utils/constants/api";

const authApi = {
    me: async () => {
        const response = await axios.get(`${API_CONSTANTS.AUTH_API_PREFIX}/me`);

        return response.data;
    },

    loginAsGuest: async () => {
        const response = await axios.post(
            `${API_CONSTANTS.AUTH_API_PREFIX}/register-guest`,
        );

        return response.data;
    },
};

export default authApi;
