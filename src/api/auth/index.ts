import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";
const AUTH_API_PREFIX = `${API_URL}/auth`;

const authApi = {
    me: async () => {
        const response = await axios.get(`${AUTH_API_PREFIX}/me`);

        return response.data;
    },

    loginAsGuest: async () => {
        const response = await axios.post(`${AUTH_API_PREFIX}/register-guest`);

        return response.data;
    },
};

export default authApi;
