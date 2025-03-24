import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, useWindowDimensions } from "react-native";

export default function CategoryPage() {
  const { name } = useLocalSearchParams(); // Get category name from URL
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get screen width to dynamically adjust columns (optional)
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 2; // Example: 3 columns for tablets, 2 for phones

  useEffect(() => {
    if (name) {
      fetchBooks(name);
    }
  }, [name]);

  const fetchBooks = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/library/books?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books in {name}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5ABAB7" style={styles.loader} />
      ) : books.length > 0 ? (
        <FlatList
          key={`flatlist-${numColumns}`} // 🔥 Forces re-render when numColumns changes
          data={books}
          keyExtractor={(item) => item._id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBooksText}>No books found for this category</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5ABAB7",
    textAlign: "center",
    marginBottom: 15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    justifyContent: "space-between",
  },
  bookItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Adds shadow on Android
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  bookAuthor: {
    fontSize: 12,
    color: "#555",
    marginTop: 3,
    textAlign: "center",
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});
