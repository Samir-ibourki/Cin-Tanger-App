import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { useCreateReservation } from "../../hooks/useCreateReservation";
import { ArrowLeft, Users, CreditCard, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SeatsScreen() {
  const router = useRouter();
  const { filmId, title } = useLocalSearchParams();
  const [selectedSession, setSelectedSession] = useState(null);
  const [count, setCount] = useState(1);

  const PRICE_PER_SEAT = 60;

  const { data: sessions, isLoading, error } = useQuery({
    queryKey: ["sessions", filmId],
    queryFn: async () => {
      console.log("Fetching sessions for filmId:", filmId);
      const res = await api.get(`/sessions/film/${filmId}`);
      const data = res.data?.data || res.data || [];
      console.log("Sessions received:", data.length);
      return data;
    },
    enabled: !!filmId,
  });

  const { mutate, isLoading: isSaving } = useCreateReservation();

  const handleSessionSelect = (session) => {
    console.log("Session selected:", session.id);
    setSelectedSession(session);
  };

  const handleConfirm = () => {
    if (!selectedSession) return;
    console.log("Confirming reservation for session:", selectedSession.id, "count:", count);

    mutate(
      {
        sessionId: selectedSession.id,
        seatsCount: count,
      },
      {
        onSuccess: () => {
          console.log("Reservation successful");
          router.push("/reservation/confirmation");
        },
        onError: (err) => {
          console.error("Reservation error:", err);
          alert(err.response?.data?.message || err.message || "Erreur lors de la réservation");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Chargement des séances...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={() => {
            console.log("Back button pressed");
            router.back();
          }}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title || "Réservation"}</Text>
          <Text style={styles.headerSubtitle}>Sélectionnez votre séance</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Séances disponibles</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{sessions?.length || 0} Options</Text>
          </View>
        </View>

        {sessions && sessions.length > 0 ? (
          sessions.map((session) => (
            <Pressable
              key={session.id}
              style={({ pressed }) => [
                styles.sessionCard,
                selectedSession?.id === session.id && styles.selectedCard,
                pressed && { opacity: 0.7 }
              ]}
              onPress={() => handleSessionSelect(session)}
            >
              <View style={styles.sessionLeft}>
                <View style={[
                  styles.timeBadge,
                  selectedSession?.id === session.id && styles.selectedTimeBadge
                ]}>
                  <Text style={[
                    styles.timeText,
                    selectedSession?.id === session.id && styles.selectedTimeText
                  ]}>{session.time}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dateText}>{session.date}</Text>
                  <Text style={styles.roomText}>Salle {session.salleId} • {session.Salle?.name || "Standard"}</Text>
                </View>
              </View>
              <View style={styles.checkIcon}>
                <ChevronRight
                  color={selectedSession?.id === session.id ? "#E50914" : "#444"}
                  size={20}
                />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune séance disponible pour ce film.</Text>
          </View>
        )}

        {selectedSession && (
          <View style={styles.seatsSection}>
            <LinearGradient
              colors={["rgba(229, 9, 20, 0.15)", "transparent"]}
              style={styles.seatsGradient}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nombre de places</Text>
              <View style={styles.badge}>
                <Users color="#999999" size={12} style={{ marginRight: 4 }} />
                <Text style={styles.badgeText}>{selectedSession.availableSeats || 0} dispo</Text>
              </View>
            </View>

            <View style={styles.counterContainer}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.counterBtn, count <= 1 && styles.disabledBtn]}
                onPress={() => {
                  console.log("Minus pressed");
                  setCount(Math.max(1, count - 1));
                }}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </TouchableOpacity>

              <View style={styles.countDisplay}>
                <Text style={styles.countText}>{count}</Text>
                <Text style={styles.countLabel}>Places</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.counterBtn, count >= Math.min(10, selectedSession.availableSeats || 50) && styles.disabledBtn]}
                onPress={() => {
                  console.log("Plus pressed");
                  setCount(Math.min(10, selectedSession.availableSeats || 50, count + 1));
                }}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.priceRow}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.priceLabel}>Prix Total</Text>
                <Text style={styles.priceValue}>{count * PRICE_PER_SEAT} DH</Text>
              </View>
              <View style={styles.priceDivider} />
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.priceLabel}>Par place</Text>
                <Text style={styles.priceValueSmall}>{PRICE_PER_SEAT} DH</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.confirmBtn, !selectedSession && styles.disabledConfirmBtn]}
          onPress={handleConfirm}
          disabled={isSaving || !selectedSession}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <CreditCard color="#fff" size={20} style={{ marginRight: 10 }} />
              <Text style={styles.confirmText}>Confirmer la réservation</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
  },
  loadingText: {
    color: "#FFFFFF",
    marginTop: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#0A0A0A",
  },
  backButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 14,
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#999999",
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    color: "#BBB",
    fontSize: 12,
    fontWeight: "700",
  },
  sessionCard: {
    backgroundColor: "#161616",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  selectedCard: {
    borderColor: "#E50914",
    backgroundColor: "rgba(229, 9, 20, 0.08)",
  },
  sessionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  timeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  selectedTimeBadge: {
    backgroundColor: "#E50914",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  selectedTimeText: {
    color: "#FFFFFF",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  roomText: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  checkIcon: {
    marginLeft: 10,
  },
  emptyContainer: {
    padding: 60,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    fontSize: 16,
  },
  seatsSection: {
    marginTop: 20,
    padding: 24,
    backgroundColor: "#161616",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  seatsGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    gap: 40,
  },
  counterBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  disabledBtn: {
    opacity: 0.2,
  },
  counterBtnText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "300",
  },
  countDisplay: {
    alignItems: "center",
  },
  countText: {
    color: "#FFFFFF",
    fontSize: 54,
    fontWeight: "900",
  },
  countLabel: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: -5,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 30,
  },
  priceLabel: {
    color: "#777",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  priceValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },
  priceValueSmall: {
    color: "#DDD",
    fontSize: 18,
    fontWeight: "700",
  },
  priceDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#0A0A0A",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  confirmBtn: {
    backgroundColor: "#E50914",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  disabledConfirmBtn: {
    backgroundColor: "#222",
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
});
