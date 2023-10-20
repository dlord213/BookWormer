import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { Image } from "expo-image";
import { darkPalettes } from "../../palettes/palettes";

export default function RecommendationCard(props) {
  let { title, author, isbn } = props;

  const colorScheme = useContext(ThemeContext);

  const [imgSrc, setImgSrc] = useState(null);
  const [isImageFetched, setIsImageFetched] = useState(false);

  useEffect(() => {
    const updateOpenLibraryAPIBookCover = async () => {
      setImgSrc(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
      setTimeout(() => {
        setIsImageFetched(true);
      }, 2000);
    };

    if (isImageFetched == false) {
      updateOpenLibraryAPIBookCover();
    }
  }, []);

  return (
    <Pressable
      onPress={() => {
        console.log(isbn);
      }}
    >
      <View
        key={isbn}
        style={{
          marginVertical: 8,
          marginRight: 16,
          width: 130,
        }}
      >
        {isImageFetched === false ? (
          <>
            <ActivityIndicator
              size={96}
              style={{ marginVertical: 16 }}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </>
        ) : (
          <>
            <Image
              source={imgSrc}
              style={{
                height: 200,
                borderRadius: 8,
              }}
              contentFit="cover"
            />
          </>
        )}

        <View
          style={{
            marginVertical: 8,
          }}
        >
          <Text
            style={{
              color: colorScheme === "light" ? "black" : darkPalettes.text,
              fontFamily: "WorkSans_600SemiBold",
              fontSize: 16,
            }}
          >
            {title.toUpperCase()}
          </Text>
          <Text
            style={{
              color: "gray",
              fontFamily: "WorkSans_300Light",
            }}
          >
            {author}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
