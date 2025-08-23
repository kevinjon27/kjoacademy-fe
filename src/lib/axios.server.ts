import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL, NEXT_API_ROUTE_URL } from "@/config/api";
import { COOKIE_KEYS } from "@/config/storage";

async function getDeviceId(): Promise<string> {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get(COOKIE_KEYS.deviceId)!.value;

  // if (!deviceId) {
  //   const newDeviceId = crypto.randomUUID();
  //   const cookieStore = await cookies();
  //   cookieStore.set(COOKIE_KEYS.deviceId, newDeviceId);
  //   return newDeviceId;
  // }

  return deviceId;
}

// Use this instance to make requests to the KJO Academy API
const axiosServer: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

// axiosServer.interceptors.request.use(async (config) => {
//   console.log("headers");
//   config.headers["X-Device-Id"] = await getDeviceId();
//   config.headers["X-Request-Id"] = crypto.randomUUID();
//   console.table(config.headers);
//   return config;
// });

// axiosServer.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     // @TODO: Handle 401 Unauthorized error

//     return Promise.reject(error);
//   }
// );

const axiosServerNext: AxiosInstance = axios.create({
  baseURL: NEXT_API_ROUTE_URL,
  timeout: 10000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

[axiosServer, axiosServerNext].forEach((instance) => {
  instance.interceptors.request.use(async (config) => {
    config.headers["X-Device-Id"] = await getDeviceId();
    config.headers["X-Request-Id"] = crypto.randomUUID();
    return config;
  });

  instance.interceptors.response.use(
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
});

export { axiosServer, axiosServerNext };
