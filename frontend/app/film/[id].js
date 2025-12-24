import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function FilmDetailsScreen() {
  const router = useRouter();
  const { id, title, posterUrl } = useLocalSearchParams();


  const synopsis =
    "this is a placeholder synopsis from backend";

  const handleReserve = () => {
    
    router.push({
      pathname: `/reservation/${id}`,
      params: { title },
    });

    
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: posterUrl }} style={styles.poster} contentFit="cover" />
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.section}>Synopsis</Text>
      <Text style={styles.text}>{synopsis}</Text>

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
