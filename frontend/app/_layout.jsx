import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="reservation/confirmation" />
        <Stack.Screen name="reservation/reservescreen" />
        <Stack.Screen name="reservation/seats" />
        <Stack.Screen name="reservation/session" />
        <Stack.Screen name="film/[id]" />
      </Stack>
    </QueryClientProvider>
  );
}
