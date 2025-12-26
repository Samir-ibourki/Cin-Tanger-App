import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { useCreateReservation } from "../../hooks/useCreateReservation";

export default function SeatsScreen() {
  const { filmId } = useLocalSearchParams();
  const [selectedSession, setSelectedSession] = useState(null);
  const [count, setCount] = useState(1);

  const PRICE_PER_SEAT = 60;

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions", filmId],
    queryFn: async () => {
      const res = await api.get(`/session/film/${filmId}`);
      return res.data.data || res.data;
    },
    enabled: !!filmId,
  });

  const { mutate, isLoading: isSaving } = useCreateReservation();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading sessions...</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    if (!selectedSession) return;

    mutate(
      {
        sessionId: selectedSession.id,
        seatsCount: count,
      },
      { onSuccess: () => router.push("/reservation/confirmation") }
    );
  };

  return (
    <View style={styles.container}>
      {/* SESSIONS */}
      <Text style={styles.section}>Select Session</Text>

      {sessions?.map((session) => (
        <Pressable
          key={session.id}
          style={[
            styles.sessionCard,
            selectedSession?.id === session.id && styles.selectedCard,
          ]}
          onPress={() => setSelectedSession(session)}
        >
          <Text style={styles.sessionText}>
            {session.date} • {session.time}
          </Text>
          <Text style={styles.roomText}>Salle {session.salleId}</Text>
        </Pressable>
      ))}

      {/* SEATS */}
      {selectedSession && (
        <>
          <Text style={styles.section}>Seats</Text>

          <View style={styles.counter}>
            <Pressable onPress={() => setCount(Math.max(1, count - 1))}>
              <Text style={styles.btn}>−</Text>
            </Pressable>

            <Text style={styles.count}>{count}</Text>

            <Pressable onPress={() => setCount(Math.min(10, count + 1))}>
              <Text style={styles.btn}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.price}>
            Total: {count * PRICE_PER_SEAT} DH
          </Text>

          <Pressable
            style={styles.confirmBtn}
            onPress={handleConfirm}
            disabled={isSaving}
          >
            <Text style={styles.confirmText}>
              {isSaving ? "Saving..." : "Confirm Reservation"}
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  loadingText: {
    color: "#aaa",
    marginTop: 10,
  },
  section: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 16,
  },
  sessionCard: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedCard: {
    borderColor: "#E50914",
  },
  sessionText: {
    color: "#fff",
    fontSize: 16,
  },
  roomText: {
    color: "#aaa",
    marginTop: 4,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  btn: {
    color: "#fff",
    fontSize: 28,
    paddingHorizontal: 20,
  },
  count: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  price: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  confirmBtn: {
    backgroundColor: "#E50914",
    padding: 16,
    borderRadius: 12,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
