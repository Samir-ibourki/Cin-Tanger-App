import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const generateCode = () =>
  "CT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

export default function ConfirmationScreen() {
  const { seats } = useLocalSearchParams();
  const code = generateCode();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reservation Confirmed</Text>

        <Text style={styles.text}>Seats: {seats}</Text>

        <Text style={styles.code}>{code}</Text>

        <Text style={styles.hint}>
          Show this code at the cinema entrance.
        </Text>
      </View>
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
  card: {
    backgroundColor: "#1f1f1f",
    padding: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#E50914",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  code: {
    color: "#E50914",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 20,
    letterSpacing: 2,
  },
  hint: {
    color: "#aaa",
    textAlign: "center",
  },
});
