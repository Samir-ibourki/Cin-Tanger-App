import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createReservation } from "../api/reservationsApi.js";
import { useTicketStore } from "../store/ticketStore";

export const useCreateReservation = () => {
  const setTicket = useTicketStore((state) => state.setTicket);

  return useMutation({
    mutationFn: createReservation,

    onSuccess: async (data) => {
      const { confirmationCode, qrCode } = data.ticket;
      const ticket = { confirmationCode, qrCode };
      await AsyncStorage.setItem("ticket", JSON.stringify(ticket));

      setTicket(ticket);
    },
  });
};
