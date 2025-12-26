import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateReservation } from "../../hooks/useCreateReservation";

export default function SelectSeatsScreen() {
  const { sessionId, time, title } = useLocalSearchParams();
  const [count, setCount] = useState(1);
  const PRICE_PER_SEAT = 60; // Example: 60 DH

  const { mutate, isLoading } = useCreateReservation();

  const handleConfirm = () => {
    mutate(
      { sessionId, seatsCount: count },
      { onSuccess: () => router.push("/reservation/confirmation") }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.overhead}>Booking for</Text>
        <Text style={styles.title}>{title || "CinéTanger"}</Text>
        <View style={styles.sessionBadge}>
          <Text style={styles.sessionText}>Today • {time}</Text>
        </View>
      </View>

      {/* Main Counter Section */}
      <View style={styles.content}>
        <Text style={styles.label}>How many seats?</Text>
        
        <View style={styles.counterContainer}>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={() => setCount(Math.max(1, count - 1))}
          >
            <Text style={styles.btnText}>−</Text>
          </Pressable>

          <View style={styles.countDisplay}>
            <Text style={styles.countNumber}>{count}</Text>
            <Text style={styles.countLabel}>{count === 1 ? 'SEAT' : 'SEATS'}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={() => setCount(Math.min(10, count + 1))}
          >
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>

        {/* Pricing Info */}
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>{count * PRICE_PER_SEAT} DH</Text>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.footer}>
        <Pressable 
          style={({ pressed }) => [
            styles.confirmBtn, 
            pressed && styles.confirmBtnPressed,
            isLoading && styles.disabledBtn
          ]} 
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmBtnText}>Confirm Reservation</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  overhead: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },
  sessionBadge: {
    backgroundColor: "#222",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  sessionText: {
    color: "#aaa",
    fontSize: 14,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  label: {
    color: "#666",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "500",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  btn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  btnPressed: {
    backgroundColor: "#333",
    transform: [{ scale: 0.95 }],
  },
  btnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  countDisplay: {
    alignItems: 'center',
    marginHorizontal: 40,
  },
  countNumber: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "800",
  },
  countLabel: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: -5,
  },
  priceRow: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  priceLabel: {
    color: '#888',
    fontSize: 16,
  },
  priceValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  confirmBtn: {
    backgroundColor: "#E50914",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  confirmBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabledBtn: {
    backgroundColor: "#555",
  },
  confirmBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});