import { useContext, useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { darkPalettes } from "../../palettes/palettes";
import { Ionicons } from "@expo/vector-icons";

export default function PageHeader(props) {
  const colorScheme = useContext(ThemeContext);
  const { title, subtitle } = props;

  const [query, setQuery] = useState("");
  const [IsQueryEmpty, setIsQueryEmpty] = useState(true);

  let titleColor = colorScheme === "light" ? "black" : darkPalettes.text;
  let subTitleColor = colorScheme === "light" ? "gray" : "gray";
  let searchBarColor = colorScheme === "light" ? "gray" : "white";

  useEffect(() => {
    if (query == "") {
      setIsQueryEmpty(true);
    } else {
      setIsQueryEmpty(false);
    }
  }, [query]);

  return (
    <View>
      <Text
        style={{
          fontSize: 36,
          fontFamily: "WorkSans_700Bold",
          color: titleColor,
          position: "relative",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "WorkSans_300Light",
          color: subTitleColor,
        }}
      >
        {subtitle}
      </Text>
      <View
        style={{
          marginVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextInput
          style={{
            backgroundColor: searchBarColor,
            fontFamily: "WorkSans_400Regular",
            color: colorScheme === "light" ? "white" : "black",
            padding: 8,
            borderRadius: 4,
            flexGrow: 1,
          }}
          placeholder="Search for a book"
          selectionColor={colorScheme === "light" ? "white" : "black"}
          numberOfLines={1}
          value={query}
          onChangeText={(userQuery) => setQuery(userQuery)}
        />
        {IsQueryEmpty === true ? (
          <></>
        ) : (
          <>
            <Ionicons name="md-search" size={36} color={searchBarColor} />
          </>
        )}
      </View>
    </View>
  );
}
