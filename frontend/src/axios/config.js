import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://the-city-garden-1.onrender.com/",
  withCredentials: true,
});

// Always read the latest token on every request (picks up token set after login)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("hm_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

