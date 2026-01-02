import api from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "films_cache";

export const getFilms = async () => {
  try {
  
    const response = await api.get(`/film`);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
    return response.data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    console.log("Offline → loading cached films");

    
    const cached = await AsyncStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    
    return [];
  }
};
