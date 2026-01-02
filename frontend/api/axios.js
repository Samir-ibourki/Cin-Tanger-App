import axios from "axios";

const isProduction = true; // Bedela l false bach t-khdem B local f pc dyalk

const API_url = isProduction
  ? "https://cin-tanger-app-production.up.railway.app"
  : "http://192.168.8.11:5000"; // Port 5000 kima ban f logs dyalk

const api = axios.create({
  baseURL: API_url,
  timeout: 15000,
});
export default api;
