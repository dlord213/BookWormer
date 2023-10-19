import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "../../contexts/themeContext";
import { useContext, useEffect } from "react";
import { darkPalettes } from "../../palettes/palettes";
import CategoriesHeader from "./components/CategoriesHeader";
import CategoriesList from "./components/CategoriesList";

export default function Page() {
  const colorScheme = useContext(ThemeContext);

  return (
    <SafeAreaProvider
      style={{
        backgroundColor:
          colorScheme === "light" ? "white" : darkPalettes.background,
        paddingHorizontal: 24,
      }}
    >
      <CategoriesHeader />
      <CategoriesList />
    </SafeAreaProvider>
  );
}
