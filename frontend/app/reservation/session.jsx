// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { router, useLocalSearchParams } from "expo-router";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../api/axios";
// export default function SelectSessionScreen() {
//   const { filmId, title } = useLocalSearchParams();

//   const { data, isLoading } = useQuery({
//     queryKey: ["sessions", filmId],
//     queryFn: async () => {
//       const res = await api.get(`/sessions/film/${filmId}`);
//       return res.data.data;
//     },
//   });

//   if (isLoading) {
//     return <Text style={{ color: "#fff" }}>Loading sessions...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Session</Text>
//       <Text style={styles.movie}>{title}</Text>

//       {data.map((session) => (
//         <Pressable
//           key={session.id}
//           style={styles.card}
//           onPress={() =>
//             router.push({
//               pathname: "/reservation/seats",
//               params: {
//                 filmId,
//                 sessionId: session.id,
//                 time: session.time,
//               },
//             })
//           }
//         >
//           <Text style={styles.time}>
//             {session.date} - {session.time}
//           </Text>
//           <Text style={styles.room}>Salle {session.salleId}</Text>
//         </Pressable>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141414",
//     padding: 16,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   movie: {
//     color: "#aaa",
//     marginBottom: 24,
//   },
//   card: {
//     backgroundColor: "#1f1f1f",
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 14,
//     borderLeftWidth: 4,
//     borderLeftColor: "#E50914",
//   },
//   time: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   room: {
//     color: "#aaa",
//     marginTop: 4,
//   },
// });

import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSessionsByFilm } from "../../hooks/useSessionsByFilm"; 
// import api from "../../api/axios";

export default function SelectSessionScreen() {
 
  const { id, title } = useLocalSearchParams();
  const { data, isLoading, isError } = useSessionsByFilm(filmId);
  console.log("id film");
console.log(filmId);
  if (isLoading) return <Text style={styles.message}>Loading sessions...</Text>;
  if (isError) return <Text style={[styles.message, { color: "red" }]}>Failed to load sessions</Text>;
  if (data.length === 0) return <Text style={styles.message}>No sessions available</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Session</Text>
      <Text style={styles.movie}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: session }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/reservation/seats",
                params: {
                  filmId,
                  sessionId: session.id,
                  time: session.time,
                },
              })
            }
          >
            <Text style={styles.time}>
              {session.date} - {session.time}
            </Text>
            <Text style={styles.room}>
              Salle: {session.Salle?.name} ({session.Salle?.capacity} places)
            </Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414", padding: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  movie: { color: "#aaa", marginBottom: 16 },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#E50914",
  },
  time: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  room: { color: "#aaa", marginTop: 4 },
  message: { color: "#fff", textAlign: "center", marginTop: 20 },
});
