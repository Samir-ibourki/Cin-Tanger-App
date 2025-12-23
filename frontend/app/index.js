import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getFilms } from "../src/services/filmservice";
import FilmCard from "../src/components/filmCard";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["films"],
    queryFn: getFilms,
  });

  if (isLoading) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

if (error) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorText}>
        Erreur de chargement des films
      </Text>
    </View>
  );
}


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <FilmCard film={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0b0b0b",
  },
  center: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0b0b0b",
},
errorText: {
  color: "#fff",
  fontSize: 16,
},

});
