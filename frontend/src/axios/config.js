import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.136.153.47:3000/",
  withCredentials: true,
});

const token = localStorage.getItem("hm_admin_token");
if (token) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default instance;
