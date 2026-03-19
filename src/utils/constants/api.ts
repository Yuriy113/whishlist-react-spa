const API_URL = import.meta.env.VITE_API_URL || "/api";
const AUTH_API_PREFIX = `${API_URL}/auth`;
const WISHES_API_PREFIX = `${API_URL}/wishes`;

export const API_CONSTANTS = { API_URL, AUTH_API_PREFIX, WISHES_API_PREFIX };
