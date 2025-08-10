import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { cookies } from 'next/headers';

// Base configuration
const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper functions for cookie management
const getCookie = async (name: string): Promise<string | null> => {
  if (typeof window !== 'undefined') {
    // Client-side: get from document.cookie
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  } else {
    // Server-side: get from Next.js cookies
    try {
      const cookieStore = await cookies();
      return cookieStore.get(name)?.value || null;
    } catch {
      return null;
    }
  }
};

const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof window !== 'undefined') {
    // Client-side: set in document.cookie
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  }
};

const removeCookie = (name: string): void => {
  if (typeof window !== 'undefined') {
    // Client-side: remove from document.cookie
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// Server-side cookie helpers (for server actions)
export const getServerSideCookie = async (name: string): Promise<string | undefined> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } catch {
    return undefined;
  }
};

export const setServerSideCookie = (name: string, value: string, options?: {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
}): void => {
  // This will be implemented when we handle server actions
  // For now, we'll use client-side cookies
};

// Create axios instance
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// Request interceptor to add Bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get token from cookies
    const token = await getCookie('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for automatic token refresh
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshToken = await getCookie('refresh_token');
        
        if (refreshToken) {
          const refreshResponse = await axios.post(
            `${baseConfig.baseURL}/auth/refresh`,
            { refresh_token: refreshToken }
          );
          
          const { access_token, refresh_token } = refreshResponse.data;
          
          // Update tokens in cookies
          setCookie('access_token', access_token);
          if (refresh_token) {
            setCookie('refresh_token', refresh_token);
          }
          
          // Retry original request with new token
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear cookies and redirect to login
        removeCookie('access_token');
        removeCookie('refresh_token');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        // For server-side, you might want to throw an error or handle differently
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to create a new instance with custom config
export const createAxiosInstance = (config?: AxiosRequestConfig): AxiosInstance => {
  return axios.create({
    ...baseConfig,
    ...config,
  });
};

// Export the main instance
export default axiosInstance;

// Export types for better TypeScript support
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
