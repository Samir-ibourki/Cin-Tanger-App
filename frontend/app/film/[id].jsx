import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Clock, Star, Play, Calendar } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function FilmDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: film, isLoading, error } = useQuery({
    queryKey: ["film", id],
    queryFn: async () => {
      const res = await api.get(`/film/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Chargement du film...</Text>
      </View>
    );
  }

  if (error || !film) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Impossible de charger les détails.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { title, posterUrl, description, duration, rating, genre } = film;

  const handleReserve = () => {
    router.push({
      pathname: "/reservation/seats",
      params: {
        filmId: id,
        title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Poster Header */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: posterUrl }}
            style={styles.poster}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(10, 10, 10, 0.8)", "#0A0A0A"]}
            style={styles.gradient}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#FFFFFF" size={24} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.posterContent}>
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{genre || "Action"}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock color="#E50914" size={16} strokeWidth={2.5} />
                <Text style={styles.metaText}>{duration} min</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Star color="#FFD700" size={16} fill="#FFD700" />
                <Text style={styles.metaText}>{rating}/10</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Calendar color="#E50914" size={16} strokeWidth={2.5} />
                <Text style={styles.metaText}>2024</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>Synopsis</Text>
          </View>
          <Text style={styles.description}>
            {description || "Aucun synopsis disponible pour ce film."}
          </Text>

          <View style={styles.castContainer}>
            <Text style={styles.sectionTitleSmall}>Réalisation</Text>
            <Text style={styles.castText}>Tanger Cinema Production</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.footer}>
        <LinearGradient
          colors={["transparent", "rgba(10, 10, 10, 0.9)", "#0A0A0A"]}
          style={styles.footerGradient}
        />
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Play color="#FFFFFF" size={20} fill="#FFFFFF" />
          <Text style={styles.reserveButtonText}>Réserver ma place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  posterContainer: {
    width: width,
    height: height * 0.6,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  posterContent: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  genreBadge: {
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(229, 9, 20, 0.4)",
    marginBottom: 12,
  },
  genreText: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  metaDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  sectionIndicator: {
    width: 4,
    height: 20,
    backgroundColor: "#E50914",
    borderRadius: 2,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    color: "#CCCCCC",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "400",
  },
  sectionTitleSmall: {
    color: "#999999",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  castText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  footerGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  reserveButton: {
    backgroundColor: "#E50914",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  reserveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  backBtn: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#E50914",
    borderRadius: 8,
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
