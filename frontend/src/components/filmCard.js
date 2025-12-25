import { Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function FilmCard({ film }) {
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/film/[id]",
          params: {
            id: film.id,
            title: film.title,
            posterUrl: film.posterUrl,
          },
        })
      }
    >
      <Image
        source={{ uri: film.posterUrl }}
        style={styles.poster}
        contentFit="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {film.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
  },
  poster: {
    height: 220,
    borderRadius: 10,
  },
  title: {
    marginTop: 6,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
