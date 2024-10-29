// import axios, { AxiosError } from 'axios';

import useAxiosSecure from "./useAxiosSecure";

// const API_BASE_URL = 'https://diasporex-api.vercel.app/api/v1';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Cache-Control': 'no-cache',
//     'Accept': '*/*',
//   },
// });

// // Add a request interceptor to handle token injection
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); 
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; 
//     } else {
//       console.error('No token found in localStorage');
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Error in request interceptor:', error);
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to handle errors globally
// axiosInstance.interceptors.response.use(
//   (response) => response, 
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized: Invalid or expired token');
      
//     }
//     return Promise.reject(error);
//   }
// );

// Recipient interface
export interface Recipient {
  fullName: string;
  email: string;
  country: string;
  city: string;
  phone: string;
  bankName: string;
  accountNumber: string;
}

// Create a recipient

export const CreateRecipient =  (recipientData: Recipient)=> {
  try {
    const axiosInstance =  useAxiosSecure();
    axiosInstance.post('/recipient', recipientData).then((response)=>{
      return response.data;
    }); // Send POST request
    
  } catch (error) {
    
    // if (axios.isAxiosError(error)) {
    // //   const axiosError = error as AxiosError;
    //   if (axiosError.response) {
    //     console.error('Error creating recipient:', axiosError.response.data);
    //     throw new Error(`Failed to create recipient: ${JSON.stringify(axiosError.response.data)}`);
    //   }
    // }
    console.error('Error creating recipient:', error);
    throw error;
  }
};

// // Search for a recipient by ID
// export const searchRecipient = async (searchId: string): Promise<Recipient | null> => {
//   try {
//     const response = await axiosInstance.get(`/recipient/${searchId}`);
//     return response.data || null; 
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError;
//       if (axiosError.response?.status === 404) {
//         return null; 
//       }
//       if (axiosError.response) {
//         console.error('Error searching recipient:', axiosError.response.data);
//         throw new Error(`Failed to search recipient: ${JSON.stringify(axiosError.response.data)}`);
//       }
//     }
//     console.error('Error searching recipient:', error);
//     throw error;
//   }
// };
