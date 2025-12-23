import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const generateCode = () =>
  "CT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

export default function ConfirmationScreen() {
  const { seats } = useLocalSearchParams();
  const code = generateCode();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Réservation confirmée</Text>

      <Text style={styles.text}>Nombre de places : {seats}</Text>

      <Text style={styles.code}>{code}</Text>

      <Text style={styles.hint}>
        Présentez ce code au guichet pour récupérer vos billets.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    color: "#ddd",
    fontSize: 16,
    marginBottom: 12,
  },
  code: {
    color: "#e50914",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  hint: {
    color: "#aaa",
    textAlign: "center",
  },
});
