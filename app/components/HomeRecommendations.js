import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { KeyContext } from "../../contexts/keyContext";
import { ThemeContext } from "../../contexts/themeContext";
import { darkPalettes } from "../../palettes/palettes";
import LoadingSkeleton from "./LoadingSkeleton";
import RecommendationCard from "./RecommendationCard";

export default function PageRecommendations(props) {
  const key = useContext(KeyContext);
  const colorScheme = useContext(ThemeContext);
  let { title, listName } = props;

  const [data, setData] = useState(undefined);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const getData = async () => {
      // combined-print-and-e-book-nonfiction - example

      let apiLink = `https://api.nytimes.com/svc/books/v3/lists.json?list-name=${listName}&api-key=${key}`;

      const response = await fetch(apiLink);
      const bookData = await response.json();

      setData(bookData);
      setIsFetched(true);
    };

    if (isFetched == false) {
      getData();
    }
  }, []);

  return (
    <View style={{}}>
      <Text
        style={{
          fontFamily: "WorkSans_300Light",
          fontSize: 24,
          color: colorScheme === "light" ? "black" : darkPalettes.text,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderColor: colorScheme === "light" ? "black" : "white",
        }}
      >
        {title}
      </Text>
      {isFetched === false ? (
        <>
          <LoadingSkeleton />
        </>
      ) : (
        <>
          <FlatList
            horizontal
            data={data.results}
            keyExtractor={(elem) => elem.book_details[0].primary_isbn13}
            renderItem={({ item }) => (
              <RecommendationCard
                title={item.book_details[0].title}
                author={item.book_details[0].author}
                isbn={item.book_details[0].primary_isbn13}
              />
            )}
          />
        </>
      )}
    </View>
  );
}
