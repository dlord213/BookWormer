import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeContext } from "../contexts/themeContext";
import {
  useFonts,
  WorkSans_100Thin,
  WorkSans_200ExtraLight,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/dev";
import { Ionicons } from "@expo/vector-icons";
import { darkPalettes } from "../palettes/palettes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { mainStyles } from "./styles/styles";

export default function Layout() {
  let colorScheme = useColorScheme();

  let [fontsLoaded, fontError] = useFonts({
    WorkSans_100Thin,
    WorkSans_200ExtraLight,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  let MainViewBackgroundColor =
    colorScheme === "light"
      ? mainStyles.MainViewLight
      : mainStyles.MainViewDark;

  return (
    <ThemeContext.Provider value={colorScheme}>
      <SafeAreaProvider style={[mainStyles.MainView, MainViewBackgroundColor]}>
        <Tabs
          initialRouteName="index"
          screenOptions={{
            tabBarActiveTintColor: colorScheme === "light" ? "black" : "white",
            tabBarStyle: {
              height: 70,
              backgroundColor:
                colorScheme === "light" ? "black" : darkPalettes.background,
              borderTopWidth: 2,
            },
            tabBarLabelStyle: {
              fontSize: 0,
              fontFamily: "WorkSans_400Regular",
              color: colorScheme === "light" ? "black" : "white",
            },
            tabBarIconStyle: {
              color: colorScheme === "light" ? "white" : "black",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="categories/index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="reorder-three" size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="categories/components/CategoriesHeader"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="categories/components/CategoriesList"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="components/LoadingSkeleton"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="components/HomeHeader"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="components/HomeRecommendations"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="components/HomeStatusBar"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="components/RecommendationCard"
            options={{
              href: null,
            }}
          />
        </Tabs>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
