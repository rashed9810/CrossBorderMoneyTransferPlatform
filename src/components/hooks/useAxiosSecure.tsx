
import axios from 'axios';
import Cookies from 'js-cookie';


const AUTH_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
let authToken: string | null = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN_KEY) : null;
let refreshToken = Cookies.get('refreshToken');

export const setAuthTokens = (newAuthToken: string | null, newRefreshToken: string | null) => {
    authToken = newAuthToken;
    if (newAuthToken) {
        typeof window !== "undefined" ? localStorage.setItem(AUTH_TOKEN_KEY, newAuthToken) : null;
    } else {
        typeof window !== "undefined" ? localStorage.removeItem(AUTH_TOKEN_KEY) : null
    }
};

const axiosInstance = axios.create({
    baseURL: 'https://diasporex-api.vercel.app/api/v1',
});

const useAxiosSecure = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (authToken) {
                config.headers['Authorization'] = `${authToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    axiosInstance.interceptors.response.use(
        (response) => {

            Cookies.set('accessToken', response?.data?.data.accessToken, { expires: 1 });
            Cookies.set('refreshToken', response?.data?.data.refreshToken);

            typeof window !== "undefined" ? localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.data.accessToken) : false;
            return response
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
                originalRequest._retry = true;
                try {
                    const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });

                    const newAuthToken = response.data.accessToken;
                    setAuthTokens(newAuthToken, refreshToken); // Save new token to localStorage

                    axiosInstance.defaults.headers.common['Authorization'] = `${newAuthToken}`;
                    return axiosInstance(originalRequest);

                } catch (err) {
                    setAuthTokens(null, null); // Clear tokens on failure
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export default useAxiosSecure;
