import "expo-router/entry";

import { ScrollView } from "react-native";
import PageHeader from "./components/HomeHeader";
import PageRecommendations from "./components/HomeRecommendations";
import PageStatusBar from "./components/HomeStatusBar";
import { ThemeContext } from "../contexts/themeContext";
import { useContext } from "react";
import { darkPalettes } from "../palettes/palettes";

export default function IndexPage() {
  let colorScheme = useContext(ThemeContext);

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor:
          colorScheme === "light" ? "white" : darkPalettes.background,
        paddingHorizontal: 24,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader title="BookWormer" subtitle="Finding a book?" />
      <PageStatusBar />
      <PageRecommendations
        listName="combined-print-and-e-book-nonfiction"
        title="Non-fiction best sellers"
      />
      <PageRecommendations
        listName="hardcover-fiction"
        title="Fiction best sellers"
      />
      <PageRecommendations
        listName="advice-how-to-and-miscellaneous"
        title="Advices, How-to and Miscellaneous"
      />
    </ScrollView>
  );
}
