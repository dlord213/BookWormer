import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { Image } from "expo-image";
import { darkPalettes } from "../../palettes/palettes";

export default function RecommendationCard(props) {
  let { title, author, isbn } = props;

  const colorScheme = useContext(ThemeContext);

  const googleKey = "AIzaSyCUVqEXFDnxTI20OjTiP_CnCAIgciydGWg";

  const [imgSrc, setImgSrc] = useState(null);
  const [isImageFetched, setIsImageFetched] = useState(false);

  useEffect(() => {
    const updateGoogleAPIBookCover = async () => {
      let apiLink = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${googleKey}`;

      fetch(apiLink)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var img = data.items[0].volumeInfo.imageLinks.thumbnail;
          setImgSrc(img);
          setIsImageFetched(true);
        })
        .catch((error) => {
          updateOpenLibraryAPIBookCover();
        });
    };

    const updateOpenLibraryAPIBookCover = async () => {
      let apiLink = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json`;

      fetch(apiLink)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setImgSrc(data[`ISBN:${isbn}`].thumbnail_url);
          setIsImageFetched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isImageFetched == false) {
      updateGoogleAPIBookCover();
    }
  }, []);

  return (
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
  );
}
