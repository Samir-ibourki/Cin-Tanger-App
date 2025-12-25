import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useFilms = () => {
  return useQuery({
    queryKey: ["films"],
    queryFn: async () => {
      const res = await api.get("/film");
      return res.data;
    },
  });
};
