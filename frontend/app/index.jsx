import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import FilmCard from "../components/FilmCard.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilms } from "../hooks/useFilms";
import { Clapperboard, MapPin } from "lucide-react-native";

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

      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Clapperboard color="#E50914" size={32} strokeWidth={2} />
            <Text style={styles.logo}>CinéTanger</Text>
          </View>
          <View style={styles.locationBadge}>
            <MapPin color="#FFD700" size={16} strokeWidth={2} />
            <Text style={styles.locationText}>Tanger</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>À lAffiche</Text>
        <Text style={styles.headerSubtitle}>
          Réservez vos places maintenant
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 20 }}
        contentContainerStyle={{
          paddingBottom: 16,
          gap: 25,
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => <FilmCard film={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  locationText: {
    color: "#FFD700",
    fontSize: 13,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "#999999",
    fontSize: 15,
    fontWeight: "400",
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
});
