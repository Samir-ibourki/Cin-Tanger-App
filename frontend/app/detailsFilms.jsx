import React from 'react'
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function detailsFilms() {
  const router = useRouter();
  return (
 <View>
      <Text>Details films</Text>
    </View>  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },})