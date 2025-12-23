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
      <Text style={styles.title}>Séances – {title}</Text>

      {mockSessions.map((session) => (
        <Pressable
          key={session.id}
          style={styles.session}
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
          <Text style={styles.text}>
            {session.time} • {session.room}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  session: {
    backgroundColor: "#1c1c1c",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
