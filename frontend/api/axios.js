import axios from "axios";

const API_url = "http://192.168.1.103:3000";
const api = axios.create({
  baseURL: API_url,
  timeout: 10000,
});
export default api;
