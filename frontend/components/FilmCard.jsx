import { Text, StyleSheet, Pressable, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Clock, Star, Sparkles, ChevronRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function FilmCard({ film }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
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
      {/* Poster Container */}
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: film.posterUrl }}
          style={styles.poster}
          contentFit="cover"
          transition={300}
        />

        {/* Premium Badge */}
        <View style={styles.premiumBadge}>
          <Sparkles color="#FFD700" size={14} strokeWidth={2} />
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Star color="#FFD700" size={10} fill="#FFD700" strokeWidth={2} />
          <Text style={styles.ratingText}>{film.rating || "8.5"}</Text>
        </View>

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "#161616"]}
          style={styles.gradientOverlay}
        />
      </View>

      {/* Film Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {film.title}
        </Text>

        <View style={styles.metaContainer}>
          <Text style={styles.genre}>
            {film.genre || "Action"}
          </Text>
          <View style={styles.dot} />
          <Text style={styles.duration}>
            {film.duration || "120"} min
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookTag}
          onPress={() => router.push({ pathname: "/film/[id]", params: { id: film.id } })}
        >
          <Text style={styles.bookTagText}>Réserver</Text>
          <ChevronRight color="#E50914" size={12} strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

// Re-importing TouchableOpacity
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#161616",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    height: CARD_WIDTH * 1.45,
    backgroundColor: "#000",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  premiumBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  genre: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "600",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#E50914",
    marginHorizontal: 6,
  },
  duration: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "600",
  },
  bookTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(229, 9, 20, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  bookTagText: {
    color: "#E50914",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
});
