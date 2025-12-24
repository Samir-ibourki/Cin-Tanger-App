import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const mockSessions = [
  { id: 1, time: "14:00", room: "Salle 1" },
  { id: 2, time: "17:30", room: "Salle 2" },
  { id: 3, time: "20:00", room: "Salle 3" },
];

export default function SelectSessionScreen() {
  const { filmId, title } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Session</Text>
      <Text style={styles.movie}>{title}</Text>

      {mockSessions.map((session) => (
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
          <Text style={styles.time}>{session.time}</Text>
          <Text style={styles.room}>{session.room}</Text>
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
