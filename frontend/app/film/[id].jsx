import React from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

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
        <Text style={styles.loadingText}>Loading film details...</Text>
      </View>
    );
  }

  if (error || !film) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load film details.</Text>
      </View>
    );
  }

  const { title, posterUrl, description, duration, rating } = film;

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
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.poster}
        contentFit="cover"
      />
      <Text style={styles.title}>{title}</Text>

      {/* Film Info */}
      <View style={styles.infoRow}>
        {duration && (
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>🕐 {duration} min</Text>
          </View>
        )}
        {rating && (
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>⭐ {rating}/10</Text>
          </View>
        )}
      </View>

      <Text style={styles.section}>Synopsis</Text>
      <Text style={styles.text}>{description || "No description available."}</Text>

      <TouchableOpacity style={styles.button} onPress={handleReserve}>
        <Text style={styles.buttonText}>Reserve Ticket</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  poster: {
    width: "100%",
    height: 400,
  },
  title: {
    color: "#E50914",
    fontSize: 26,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 8,
  },
  infoBadge: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    color: "#aaa",
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: "600",
  },
  text: {
    color: "#ddd",
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 8,
    lineHeight: 22,
  },
  button: {
    margin: 24,
    paddingVertical: 14,
    backgroundColor: "#E50914",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
