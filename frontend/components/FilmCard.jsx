import { Text, StyleSheet, Pressable, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Clock, Star, Sparkles } from "lucide-react-native";

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
          <Sparkles color="#FFD700" size={16} strokeWidth={2} />
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Star color="#FFD700" size={12} fill="#FFD700" strokeWidth={2} />
          <Text style={styles.ratingText}>{film.rating || "N/A"}</Text>
        </View>

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />
      </View>

      {/* Film Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {film.title}
        </Text>
        
        {/* Genre & Duration */}
        <View style={styles.metaContainer}>
          {film.genre && (
            <Text style={styles.genre} numberOfLines={1}>
              {film.genre}
            </Text>
          )}
          {film.duration && (
            <View style={styles.durationContainer}>
              <Clock color="#666666" size={12} strokeWidth={2} />
              <Text style={styles.duration}>{film.duration} min</Text>
            </View>
          )}
        </View>

        {/* Showtimes indicator */}
        {film.showtime_count && film.showtime_count > 0 && (
          <Text style={styles.showtimes}>
            {film.showtime_count} séance{film.showtime_count > 1 ? 's' : ''}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  // Poster Styles
  posterContainer: {
    position: "relative",
    width: "100%",
    height: CARD_WIDTH * 1.4,
    backgroundColor: "#0a0a0a",
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
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  // Badges
  premiumBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  // Info Container
  infoContainer: {
    padding: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 19,
  },

  // Meta Info
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  genre: {
    color: "#E50914",
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    color: "#666666",
    fontSize: 11,
    fontWeight: "500",
  },
  showtimes: {
    color: "#999999",
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
