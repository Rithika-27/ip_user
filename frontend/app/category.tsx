import { 
  View, Text, FlatList, Image, ActivityIndicator, 
  StyleSheet, useWindowDimensions, TouchableOpacity 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons"; 

export default function CategoryPage() {
  const { name } = useLocalSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState({});
  const [token, setToken] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message
  const router = useRouter();
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 2; 

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userToken = await AsyncStorage.getItem("token");
      if (!userToken) {
        router.push("/screens/login");
        return;
      }
      setToken(userToken);
      if (name) {
        fetchBooks(name);
      }
    } catch (error) {
      router.push("/screens/login");
    }
  };

  const fetchBooks = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/library/books?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      setBooks(data);
      const wishlistStatus = data.reduce((acc, book) => {
        acc[book._id] = false;
        return acc;
      }, {});
      setWishlist(wishlistStatus);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (bookId, bookTitle) => {
    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        setWishlist((prev) => ({ ...prev, [bookId]: true }));
        setSuccessMessage(`"${bookTitle}" added to wishlist ✅`); // ✅ Show message

        // Hide the message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Success message at the top */}
      {successMessage ? (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      <Text style={styles.header}>Books in {name}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5ABAB7" style={styles.loader} />
      ) : books.length > 0 ? (
        <FlatList
          key={`flatlist-${numColumns}`}
          data={books}
          keyExtractor={(item) => item._id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>

              {/* Heart Icon for Wishlist */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() => addToWishlist(item._id, item.title)}
              >
                <AntDesign
                  name={wishlist[item._id] ? "heart" : "hearto"}
                  size={24}
                  color={wishlist[item._id] ? "red" : "gray"}
                />
              </TouchableOpacity>
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
    elevation: 3,
    position: "relative",
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
  heartIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  noBooksText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  successMessage: {
    backgroundColor: "#d4edda",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  successText: {
    color: "#155724",
    fontWeight: "bold",
  },
});
