import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { darkPalettes } from "../../palettes/palettes";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

const RenderItem = (props) => {
  const colorScheme = useContext(ThemeContext);

  if (props.first_sentence === undefined) {
    return null;
  } else {
    return (
      <View>
        {props.title === undefined ? null : (
          <Text
            style={{
              color: colorScheme === "light" ? "black" : darkPalettes.text,
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 20,
            }}
          >
            {props.title}
          </Text>
        )}
        {props.first_sentence === undefined ? null : (
          <Text
            style={{
              color: "gray",
              fontFamily: "WorkSans_300Light",
            }}
          >
            {props.first_sentence[0]}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          {props.author_name === undefined
            ? null
            : props.author_name.map((author, index) => (
                <Text
                  style={{
                    color:
                      colorScheme === "light" ? "black" : darkPalettes.text,
                    fontFamily: "WorkSans_600SemiBold",
                    fontSize: 12,
                  }}
                  key={index}
                >
                  {author}
                </Text>
              ))}
          {props.first_publish_year === undefined ? null : (
            <Text
              style={{
                color: "gray",
                fontFamily: "WorkSans_300Light",
                fontSize: 12,
              }}
            >
              {props.first_publish_year}
            </Text>
          )}
        </View>
      </View>
    );
  }
};

export default function QueryPage() {
  const colorScheme = useContext(ThemeContext);
  const { query, _isFetching } = useLocalSearchParams();

  let title = query.replace(/%20/g, " ");
  let finalQuery = query.replace(/ /g, "+");

  let titleColor = colorScheme === "light" ? "black" : darkPalettes.text;
  let subTitleColor = colorScheme === "light" ? "gray" : "gray";

  const [fetchedData, setFetchedData] = useState(undefined);
  const [isFetching, setisFetching] = useState(_isFetching === "true");

  useEffect(() => {
    const getData = async () => {
      const searchAPILink = `https://openlibrary.org/search.json?q=${finalQuery}&language=eng&limit=10`;

      const response = await fetch(searchAPILink);
      const booksData = await response.json();

      setFetchedData(booksData.docs);
      setisFetching(false);
    };

    getData();
  }, [isFetching]);

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor:
          colorScheme === "light" ? "white" : darkPalettes.background,
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontFamily: "WorkSans_700Bold",
          color: titleColor,
        }}
      >
        Searching for
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "WorkSans_300Light",
          color: subTitleColor,
          marginBottom: 24,
        }}
      >
        {title}
      </Text>
      {isFetching === true ? (
        <ActivityIndicator
          size={96}
          color={titleColor}
          style={{ marginVertical: 48 }}
        />
      ) : (
        <FlatList
          data={fetchedData}
          style={{ flexGrow: 1, flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RenderItem
              title={item.title}
              first_sentence={item.first_sentence}
              author_name={item.author_name}
              first_publish_year={item.first_publish_year}
            />
          )}
        />
      )}
    </View>
  );
}
