import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const language = localStorage.getItem("language") || "en";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["Accept-Language"] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await AxiosInstance.post("/auth/refresh-token", {
          token: refreshToken,
        });
        localStorage.setItem("accessToken", data.accessToken);
        AxiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Unauthorized! Redirecting to login...");
        // Handle token refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
