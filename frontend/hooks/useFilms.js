import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useFilms = () => {
  return useQuery({
    queryKey: ["films"],
    queryFn: async () => {
      const res = await api.get("/film");
      console.log(res.data);

      return res.data;
    },
  });
};
