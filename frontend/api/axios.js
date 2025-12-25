import axios from "axios";

const API_url = "http://10.0.2.2:3000/api";
const api = axios.create({
  baseURL: API_url,
  timeout: 10000,
});
export default api;
