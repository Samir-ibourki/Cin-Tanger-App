import { Text, StyleSheet, ScrollView ,TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams  , useRouter } from "expo-router";


export default function FilmDetailsScreen() {
  const { id, title, posterUrl } = useLocalSearchParams();
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.poster}
        contentFit="cover"
      />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.section}>Synopsis</Text>
      <TouchableOpacity
  style={styles.reserveButton}
  onPress={() =>
    router.push({
      pathname: "/reservation/session",
      params: { id, title, posterUrl },
    })
  }
>
  <Text style={styles.reserveText}>Reserve Ticket</Text>
</TouchableOpacity>

      <Text style={styles.text}>
        backend mazal 
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  poster: {
    height: 420,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  section: {
    color: "#aaa",
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
  },
  text: {
    color: "#ddd",
    fontSize: 14,
    margin: 16,
    lineHeight: 22,
  },
  reserveButton: {
  backgroundColor: "#e50914",
  margin: 16,
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: "center",
},

reserveText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

});
