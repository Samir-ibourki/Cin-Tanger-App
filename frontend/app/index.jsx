import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import FilmCard from "../src/components/filmCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilms } from "../hooks/useFilms";

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
      <Text style={styles.header}>Now Showing</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <FilmCard film={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    paddingHorizontal: 16,
  },
  header: {
    color: "#E50914",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 16,
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
  navButton: {
    backgroundColor: "#E50914",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 12,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
