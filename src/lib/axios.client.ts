import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, NEXT_PUBLIC_API_ROUTE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";

function getDeviceId(): string {
  const deviceId = Cookies.get(COOKIE_KEYS.deviceId) || "";
  return deviceId;
}

function getAccessToken(): string {
  const accessToken = Cookies.get(COOKIE_KEYS.accessToken) || "";
  return accessToken;
}

// Use this instance to make requests to the KJO Academy API
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  const deviceId = getDeviceId();
  if (deviceId) {
    config.headers["X-Device-Id"] = deviceId;
  }
  config.headers["X-Request-Id"] = crypto.randomUUID();
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // @TODO: Handle 401 Unauthorized error

    return Promise.reject(error);
  }
);

// Use this instance to make requests to the Next.js API route
const axiosClientNext: AxiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_ROUTE_URL,
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

axiosClientNext.interceptors.request.use((config) => {
  config.headers["X-Request-Id"] = crypto.randomUUID();
  return config;
});

axiosClientNext.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // @TODO: Handle 401 Unauthorized error

    return Promise.reject(error);
  }
);

export { axiosClient, axiosClientNext };
