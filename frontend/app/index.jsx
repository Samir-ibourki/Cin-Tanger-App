import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
  Dimensions,
} from "react-native";
import FilmCard from "../components/FilmCard.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilms } from "../hooks/useFilms";
import { Clapperboard, MapPin, Search } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { data, isLoading, error } = useFilms();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading films...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load films.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["rgba(229, 9, 20, 0.15)", "transparent"]}
        style={styles.backgroundGradient}
      />

      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Clapperboard color="#FFFFFF" size={20} strokeWidth={2.5} />
            </View>
            <Text style={styles.logoText}>CinéTanger</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.iconButton}>
              <Search color="#FFFFFF" size={20} strokeWidth={2} />
            </View>
            <View style={styles.locationBadge}>
              <MapPin color="#FFD700" size={14} strokeWidth={2.5} />
              <Text style={styles.locationText}>Tanger</Text>
            </View>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>À l'Affiche</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.headerSubtitle}>
            Les films les plus attendus du moment
          </Text>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <FilmCard film={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    backgroundColor: "#E50914",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#E50914",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
  },
  locationText: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "700",
  },
  titleContainer: {
    marginTop: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },
  titleUnderline: {
    width: 40,
    height: 4,
    backgroundColor: "#E50914",
    borderRadius: 2,
    marginTop: 4,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#999999",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
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
    paddingHorizontal: 40,
    lineHeight: 24,
  },
});
