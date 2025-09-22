"use client";

import { useRefreshToken } from "@/api/auth/use-refresh-token";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";
import { axiosPrivate } from "./axios";
const useAxiosPrivate = () => {
  const { mutateAsync: refresh } = useRefreshToken();
  const auth = useAuthStore();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("Interceptor running");

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const data = await refresh();
          const newToken = data.accessToken;

          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [refresh, auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
