import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

export default function SelectSeatsScreen() {
  const { filmId, sessionId, time } = useLocalSearchParams();
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session {time}</Text>
      <Text style={styles.subtitle}>Select number of seats</Text>

      <View style={styles.counter}>
        <Pressable
          style={styles.circle}
          onPress={() => setCount(Math.max(1, count - 1))}
        >
          <Text style={styles.symbol}>−</Text>
        </Pressable>

        <Text style={styles.count}>{count}</Text>

        <Pressable
          style={styles.circle}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.symbol}>+</Text>
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
        <Text style={styles.confirmText}>Confirm Reservation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 24,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: 32,
  },
  counter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1f1f1f",
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    color: "#fff",
    fontSize: 28,
  },
  count: {
    color: "#fff",
    fontSize: 28,
    marginHorizontal: 30,
  },
  confirm: {
    backgroundColor: "#E50914",
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
