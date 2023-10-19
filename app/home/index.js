
export default function Homepage() {
  let colorScheme = useColorScheme();

  let MainViewBackgroundColor =
    colorScheme === "light"
      ? mainStyles.MainViewLight
      : mainStyles.MainViewDark;

  return (
    <ThemeContext.Provider value={colorScheme}>
      <SafeAreaView style={[mainStyles.MainView, MainViewBackgroundColor]}>
        <ScrollView
          style={{ flexGrow: 1 }}
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
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}
