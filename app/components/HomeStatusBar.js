import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import { darkPalettes } from "../../palettes/palettes";

export default function PageStatusBar(props) {
  const colorScheme = useContext(ThemeContext);

  return (
    <StatusBar
      style={colorScheme === "light" ? "dark" : "light"}
      backgroundColor={
        colorScheme === "light" ? "white" : darkPalettes.background
      }
    />
  );
}
