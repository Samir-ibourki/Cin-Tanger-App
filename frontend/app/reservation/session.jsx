import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
export default function SelectSessionScreen() {
  const { filmId, title } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["sessions", filmId],
    queryFn: async () => {
      const res = await api.get(`/sessions/film/${filmId}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Text style={{ color: "#fff" }}>Loading sessions...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Session</Text>
      <Text style={styles.movie}>{title}</Text>

      {data.map((session) => (
        <Pressable
          key={session.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/reservation/seats",
              params: {
                filmId,
                sessionId: session.id,
                time: session.time,
              },
            })
          }
        >
          <Text style={styles.time}>
            {session.date} - {session.time}
          </Text>
          <Text style={styles.room}>Salle {session.salleId}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  movie: {
    color: "#aaa",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#E50914",
  },
  time: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  room: {
    color: "#aaa",
    marginTop: 4,
  },
});
