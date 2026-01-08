import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { CheckCircle2, Share2, Home, Download, Calendar, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function ConfirmationScreen() {
  const router = useRouter();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("ticket").then((data) => {
      if (data) setTicket(JSON.parse(data));
    });
  }, []);

  if (!ticket) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Génération de votre ticket...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.successIcon}>
            <CheckCircle2 color="#4CAF50" size={60} strokeWidth={2.5} />
          </View>
          <Text style={styles.successTitle}>Réservation Terminée !</Text>
          <Text style={styles.successSubtitle}>Votre place est réservée. Bonne séance !</Text>
        </View>

        {/* Digital Ticket */}
        <View style={styles.ticketContainer}>
          {/* Top Part */}
          <View style={styles.ticketTop}>
            <Text style={styles.movieTitle}>CinéTanger Premium</Text>
            <View style={styles.ticketBadge}>
              <Text style={styles.badgeText}>CONFIRMÉ</Text>
            </View>
          </View>

          {/* Dotted Line with Circles (Cut-out effect) */}
          <View style={styles.dividerContainer}>
            <View style={styles.leftCutout} />
            <View style={styles.dottedLine} />
            <View style={styles.rightCutout} />
          </View>

          {/* Bottom Part (QR Code & Details) */}
          <View style={styles.ticketBottom}>
            <View style={styles.qrContainer}>
              <View style={styles.qrWrapper}>
                <QRCode value={ticket.confirmationCode} size={150} color="#000" backgroundColor="#fff" />
              </View>
              <Text style={styles.confirmationCode}>{ticket.confirmationCode}</Text>
            </View>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Calendar color="#E50914" size={16} />
                <Text style={styles.detailLabel}>DATE</Text>
                <Text style={styles.detailValue}>Aujourd'hui</Text>
              </View>
              <View style={styles.detailItem}>
                <MapPin color="#E50914" size={16} />
                <Text style={styles.detailLabel}>SALLE</Text>
                <Text style={styles.detailValue}>Premium 1</Text>
              </View>
            </View>

            <Text style={styles.hint}>
              Veuillez présenter ce code à l'entrée du cinéma.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
            <Share2 color="#FFFFFF" size={20} />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
            <Download color="#FFFFFF" size={20} />
            <Text style={styles.actionText}>Télécharger</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={() => router.replace("/")}
        >
          <Home color="#FFFFFF" size={20} style={{ marginRight: 10 }} />
          <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  successIcon: {
    marginBottom: 20,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    padding: 20,
    borderRadius: 50,
  },
  successTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  successSubtitle: {
    color: "#999999",
    fontSize: 15,
    textAlign: "center",
  },
  ticketContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  ticketTop: {
    padding: 25,
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  ticketBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  badgeText: {
    color: "#4CAF50",
    fontSize: 10,
    fontWeight: "700",
  },
  dividerContainer: {
    height: 30,
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  leftCutout: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0A0A0A",
    marginLeft: -15,
  },
  rightCutout: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0A0A0A",
    marginRight: -15,
  },
  dottedLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "dashed",
  },
  ticketBottom: {
    padding: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  qrContainer: {
    alignItems: "center",
  },
  qrWrapper: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  confirmationCode: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 15,
    letterSpacing: 4,
  },
  detailsGrid: {
    flexDirection: "row",
    width: "100%",
    marginTop: 25,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    justifyContent: "space-around",
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    color: "#999999",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },
  detailValue: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  hint: {
    color: "#999999",
    fontSize: 12,
    marginTop: 25,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    width: "100%",
  },
  shareButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  downloadButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E50914",
    width: "100%",
    marginTop: 20,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
