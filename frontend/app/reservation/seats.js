import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

export default function SelectSeatsScreen() {
  const { filmId, sessionId, time } = useLocalSearchParams();
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Séance {time}</Text>

      <View style={styles.counter}>
        <Pressable onPress={() => setCount(Math.max(1, count - 1))}>
          <Text style={styles.button}> - </Text>
        </Pressable>

        <Text style={styles.count}>{count}</Text>

        <Pressable onPress={() => setCount(count + 1)}>
          <Text style={styles.button}>+</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.confirm}
        onPress={() =>
          router.push({
            pathname: "/reservation/confirmation",
            params: {
              filmId,
              sessionId,
              seats: count,
            },
          })
        }
      >
        <Text style={styles.confirmText}>Confirmer réservation</Text>
      </Pressable>
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
    marginBottom: 24,
  },
  counter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    color: "#fff",
    fontSize: 32,
    paddingHorizontal: 20,
  },
  count: {
    color: "#fff",
    fontSize: 24,
    marginHorizontal: 20,
  },
  confirm: {
    backgroundColor: "#e50914",
    padding: 16,
    borderRadius: 10,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
