import api from "./axios.js";

export const createReservation = async (data) => {
  const response = await api.post("/reservations", data);
  return response.data;
};
