import { StyleSheet } from "react-native";
import { darkPalettes } from "../../palettes/palettes";

export const mainStyles = StyleSheet.create({
  MainView: {
    paddingTop: 36,
    flexGrow: 1,
  },
  MainViewLight: {
    backgroundColor: "white",
  },
  MainViewDark: {
    backgroundColor: darkPalettes.background,
  },
});
