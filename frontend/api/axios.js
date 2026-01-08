import axios from "axios";

const isProduction = false; // Redtha false bach t-khdem B local f pc dyalk o it-l3ou l-films f tillifoun

const API_url = isProduction
  ? "https://cin-tanger-app-production.up.railway.app"
  : "http://192.168.1.104:5000"; // Port 5000 kima ban f logs dyalk

const api = axios.create({
  baseURL: API_url,
  timeout: 15000,
});
export default api;
