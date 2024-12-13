// import axios, { AxiosInstance, AxiosRequestConfig, AxiosInterceptorManager, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// // Extend the default interceptors interface to include retry
// interface ExtendedAxiosInterceptors {
//   request: AxiosInterceptorManager<InternalAxiosRequestConfig<any>>;
//   response: AxiosInterceptorManager<AxiosResponse<any, any>>;
//   retry: (config: RetryConfig) => Promise<any>;
// }

// export interface RetryConfig extends AxiosRequestConfig {
//   retries?: number;
//   retryDelay?: number;
// }

// const createAxiosInstance = (config?: RetryConfig): AxiosInstance => {
//   const instance = axios.create({
//     ...config,
//     baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//     headers: {
//       ...config?.headers,
//       'Accept': 'application/json',
//     },
//   });

//   // Add request interceptor to handle FormData
//   instance.interceptors.request.use((config) => {
//     const contentType = config.headers['Content-Type'];

//     // If the data is FormData, ensure proper headers are set
//     if (config.data instanceof FormData) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     } else if (!contentType && typeof config.data === 'object') {
//       // Default to JSON if no content type is specified and data is an object
//       config.headers['Content-Type'] = 'application/json';
//     }

//     return config;
//   });

//   // Type the interceptors as ExtendedAxiosInterceptors
//   (instance.interceptors as ExtendedAxiosInterceptors).retry = async (config: RetryConfig) => {
//     const { retries = 3, retryDelay = 1000 } = config;
//     let attempts = 0;

//     const retryRequest = async (error: any): Promise<any> => {
//       if (attempts < retries) {
//         attempts++;
//         await new Promise(resolve => setTimeout(resolve, retryDelay));
//         return instance.request(config);
//       }
//       return Promise.reject(error);
//     };

//     return retryRequest;
//   };

//   return instance;
// };

// const proxyAxiosInstance = createAxiosInstance({
//   timeout: 10000,
// });

// export default proxyAxiosInstance;

import axios from "axios";
import axiosRetry from "axios-retry";

const proxyAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosRetry(proxyAxiosInstance, { retries: 3 });

export default proxyAxiosInstance;
