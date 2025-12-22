import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function FilmCard({ film }) {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.card} 
      onPress={() => router.push(`/movie/${film.id}`)}
    >
      <Image 
        source={{ uri: film.posterUrl }} 
        style={styles.image}
        contentFit="cover"
        transition={500} 
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{film.title}</Text>
        <Text style={styles.genre}>{film.genre}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%', // Fits 2 columns nicely
    marginBottom: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
  },
  info: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  genre: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});