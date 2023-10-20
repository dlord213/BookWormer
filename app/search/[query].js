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

export default function QueryPage() {
  const colorScheme = useContext(ThemeContext);
  const { query, fetchedState } = useLocalSearchParams();

  let title = query.replace(/%20/g, " ");
  let finalQuery = query.replace(/ /g, "+");

  let titleColor = colorScheme === "light" ? "black" : darkPalettes.text;
  let subTitleColor = colorScheme === "light" ? "gray" : "gray";

  const [fetchedData, setFetchedData] = useState(undefined);
  const [isFetched, setIsFetched] = useState(fetchedState);

  useEffect(() => {
    const getData = async () => {
      const searchAPILink = `https://openlibrary.org/search.json?q=${finalQuery}&language=eng&limit=10`;

      const response = await fetch(searchAPILink);
      const booksData = await response.json();

      setFetchedData(booksData.docs);
      setIsFetched(true);
    };
    if (fetchedState == "false") {
      setIsFetched(false);
      setFetchedData(undefined);
      getData();
    }
  }, []);

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
      {isFetched === false ? (
        <ActivityIndicator
          size={96}
          color={titleColor}
          style={{ marginVertical: 48 }}
        />
      ) : (
        <FlatList
          data={fetchedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              {item.isbn === undefined ? null : (
                <Image
                  source={{
                    uri: `https://covers.openlibrary.org/b/isbn/${item.isbn[0]}-M.jpg`,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 8,
                    margin: 8,
                  }}
                  contentFit="cover"
                />
              )}
              <View>
                {item.title === undefined ? null : (
                  <Text
                    style={{
                      color:
                        colorScheme === "light" ? "black" : darkPalettes.text,
                      fontFamily: "WorkSans_600SemiBold",
                      fontSize: 20,
                    }}
                  >
                    {item.title}
                  </Text>
                )}

                {item.first_sentence === undefined ? null : (
                  <Text
                    style={{
                      color: "gray",
                      fontFamily: "WorkSans_300Light",
                    }}
                  >
                    {item.first_sentence[0]}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    justifyContent: "space-between",
                  }}
                >
                  {item.author_name === undefined
                    ? null
                    : item.author_name.map((author, index) => (
                        <Text
                          style={{
                            color:
                              colorScheme === "light"
                                ? "black"
                                : darkPalettes.text,
                            fontFamily: "WorkSans_600SemiBold",
                            fontSize: 12,
                          }}
                          key={index}
                        >
                          {author}
                        </Text>
                      ))}
                  {item.first_publish_year === undefined ? null : (
                    <Text
                      style={{
                        color: "gray",
                        fontFamily: "WorkSans_300Light",
                        fontSize: 12,
                      }}
                    >
                      {item.first_publish_year}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
