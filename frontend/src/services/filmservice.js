import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://backendapi:3000";
const STORAGE_KEY = "films_cache";

// mock data
const mockFilms = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  },
  {
    id: 3,
    title: "The Batman",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
];

export const getFilms = async () => {
  try {
    const response = await axios.get(`${API_URL}/films`);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    console.log("Offline → loading cached films");

    const cached = await AsyncStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    return mockFilms;
  }
};
