import { View, Text, Touchable, TouchableOpacity } from "react-native";
export default function Index() {
  return (
    <View>
      <Text>hello world</Text>
      <TouchableOpacity onPress={()=>Router.push("/detailsFilms")}>
              <Text>Go</Text>

      </TouchableOpacity>
    </View>
  );
}
