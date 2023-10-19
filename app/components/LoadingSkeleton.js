import { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";

export default function LoadingSkeleton() {
  const colorScheme = useContext(ThemeContext);

  return (
    <View style={{ marginVertical: 24 }}>
      <ActivityIndicator
        size={72}
        color={colorScheme === "light" ? "black" : "white"}
      />
    </View>
  );
}
