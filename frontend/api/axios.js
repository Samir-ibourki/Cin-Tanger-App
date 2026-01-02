import axios from "axios";

const API_url = "https://cin-tanger-app-production.up.railway.app";
const api = axios.create({
  baseURL: API_url,
  timeout: 10000,
});
export default api;
