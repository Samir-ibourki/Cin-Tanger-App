import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";

export default function ConfirmationScreen() {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("ticket").then((data) => {
      if (data) setTicket(JSON.parse(data));
    });
  }, []);

  if (!ticket) {
    return <Text style={{ color: "#fff" }}>Loading ticket...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reservation Confirmed</Text>

        <QRCode value={ticket.confirmationCode} size={180} />

        <Text style={styles.code}>{ticket.confirmationCode}</Text>

        <Text style={styles.hint}>
          Show this QR code at the cinema entrance.
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
