import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function ReservationScreen() {
  const { id, title } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 {title}</Text>

      <Text style={styles.subtitle}>
        Start your reservation by choosing a session.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/reservation/seats",
            params: { id, title },
          })
        }
      >
        <Text style={styles.buttonText}>Choose Session</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#E50914",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#E50914",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
