import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/header"
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userToken = await AsyncStorage.getItem("token");

        if (!userToken) {
          console.log("No token found, redirecting...");
          navigation.navigate("Login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/wishlist/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch wishlist");
        }

        setWishlist(data.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (bookId, bookTitle) => {
    try {
      const userToken = await AsyncStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/wishlist/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ bookId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove book");
      }

      setWishlist(wishlist.filter((book) => book.bookId !== bookId));
      ToastAndroid.show(`${bookTitle} removed from wishlist`, ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.header}>Your Wishlist</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5DB6A2" />
      ) : wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {wishlist.map((book) => (
            <View key={book.bookId} style={styles.bookContainer}>
              <Image source={{ uri: book.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFromWishlist(book.bookId, book.title)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF7F1",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  bookContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 80,
    height: 120,
    marginRight: 15,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "gray",
  },
  removeButton: {
    padding: 5,
  },
});

export default Wishlist;
