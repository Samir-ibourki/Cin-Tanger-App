import { create } from "zustand";
export const useTicketStore = create((set) => ({
  ticket: null,
  setTicket: (ticket) => set({ ticket }),
  clearTicket: () => set({ ticket: null }),
}));
