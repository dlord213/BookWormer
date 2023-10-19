import { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../../../contexts/themeContext";
import { darkPalettes } from "../../../palettes/palettes";

export default function CategoriesHeader(props) {
  let colorScheme = useContext(ThemeContext);

  return (
    <View>
      <Text
        style={{
          fontFamily: "WorkSans_700Bold",
          fontSize: 56,
          color: colorScheme === "light" ? "black" : darkPalettes.text,
        }}
      >
        Categories
      </Text>
      <Text
        style={{
          fontFamily: "WorkSans_300Light",
          fontSize: 24,
          color: colorScheme === "light" ? "gray" : "gray",
        }}
      >
        In need of a variety?
      </Text>
    </View>
  );
}
