import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
const BASE_API = 'https://diasporex-api.vercel.app/api/v1';
const axiosInstance = axios.create({
    baseURL: BASE_API
});

const useAxiosSecure = () => {

    axiosInstance.interceptors.request.use(
        async (config: any) => {
            let token = null;
            // Check if the environment is client-side
            const isClient = typeof window !== 'undefined';
            if (config.url !== '/auth/login' && config.url !== '/auth/register') {
                if (isClient) {
                    // client-side code: Cookies are available
                    token = Cookies.get('accessToken');
                } else {
                    // server-side code: Cookies are not available
                    const { cookies } = await import('next/headers');
                    token = cookies().get('accessToken')?.value;
                }
                if (token) {
                    config.headers['Authorization'] = token;
                } else {
                    return Promise.reject('Unauthorized');
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // Response interceptor to handle token expiration
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = getCookie('refreshToken'); // Function to get cookie
                if (refreshToken) {
                    try {
                        const response = await axios.post(
                            `${BASE_API}/auth/refresh-token`,
                            {},
                            {
                                headers: { Authorization: refreshToken }
                            }
                        );
                        const { accessToken, refreshToken: newRefreshToken } =
                            response.data.data;
                        setCookie('accessToken', accessToken);
                        setCookie('refreshToken', newRefreshToken);
                        originalRequest.headers['Authorization'] = accessToken;
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        console.error('Refresh token failed', refreshError);
                    }
                }
            }
            return Promise.reject(error);
        }
    );
    // Cookie utility functions
    const setCookie = (name: string, value: string) => {
        Cookies.set(`${name}`, value, {
            expires: 7,
            secure: true,
            sameSite: 'Strict'
        });
    };
    const getCookie = (name: string) => {
        const value = Cookies.get('accessToken');
        const parts = value?.split(`; ${name}=`);
        if (parts?.length === 2) {
            return parts.pop()?.split(';').shift();
        }
        return null;
    };

    return axiosInstance;
}

// export default api;
export default useAxiosSecure;
