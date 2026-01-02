// import { useQuery } from "@tanstack/react-query";
// import api from "../api/axios";
 
// export const useSession = (filmId) => {
//   const numericFilmId = Number(filmId); 

//   return useQuery({
//     queryKey: ["sessions", numericFilmId],
//     queryFn: async () => {
//       if (!numericFilmId) return []; 
//       const res = await api.get(`/sessions/film/${numericFilmId}`);
//       return res.data; 
//     },
//     enabled: !!numericFilmId, 
//   });
// };

import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useSessionsByFilm = (filmId) => {
  const numericFilmId = Number(filmId);

  return useQuery({
    queryKey: ["sessions", numericFilmId],
    queryFn: async () => {
      if (!numericFilmId) return [];
      const res = await api.get(`/sessions/film/${numericFilmId}`);
      return res.data.data; // data du backend
    },
    enabled: !!numericFilmId,
  });
};
