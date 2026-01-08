import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useSession = (sessionId) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      const res = await api.get(`/sessions/${sessionId}`);
      return res.data.data || res.data;
    },
    enabled: !!sessionId,
  });
};
