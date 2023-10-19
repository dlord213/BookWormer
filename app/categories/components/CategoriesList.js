import { useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "../../../contexts/themeContext";
import { darkPalettes } from "../../../palettes/palettes";

export default function CategoriesList(props) {
  let colorScheme = useContext(ThemeContext);

  const categoryList = [
    {
      title: "Fiction",
      url: "combined-print-and-e-book-fiction",
    },
    {
      title: "Non-fiction",
      url: "combined-print-and-e-book-nonfiction",
    },
    {
      title: "Advice, How-to and Miscellaneous",
      url: "advice-how-to-and-miscellaneous",
    },
    {
      title: "Children's Middle Grade",
      url: "childrens-middle-grade-hardcover",
    },
    {
      title: "Picture Books",
      url: "picture-books",
    },
    {
      title: "Series",
      url: "series-books",
    },
    {
      title: "Young Adult",
      url: "young-adult-hardcover",
    },
  ];

  return (
    <View style={{ marginTop: 24, gap: 8 }}>
      {categoryList.map((elem) => (
        <View
          key={elem.url}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            borderBottomWidth: 1,
            paddingBottom: 8,
            borderColor: colorScheme === "light" ? "black" : darkPalettes.text,
          }}
        >
          <Text
            key={elem.url}
            style={{
              fontFamily: "WorkSans_300Light",
              fontSize: 24,
              color: colorScheme === "light" ? "black" : darkPalettes.text,
            }}
          >
            {elem.title}
          </Text>
        </View>
      ))}
    </View>
  );
}
