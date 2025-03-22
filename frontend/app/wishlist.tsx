import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Footer from "../components/footer";
import Header from "../components/header";
const Wishlist = () => {
  // Simulating book availability
  const [isBookAvailable, setIsBookAvailable] = useState(true);

  const bookDetails = {
    title: "Automata Theory, Languages, and Computation",
    author: "John E. Hopcroft, Rajeev Motwani, and Jeffrey D. Ullman",
    rating: 5,
    genre: "Theoretical Computer Science",
    takenUntil: "07.01.2025",
    imageUrl: require("../assets/images/book1.png"),
    description:
      "The study of automata theory, formal languages, and computation is fundamental to understanding the theoretical underpinnings of computer science. This book provides a rigorous understanding of these topics while emphasizing their relevance to modern computing.",
  };

  return (
    <view>
        <Header />
    
    <View style={styles.container}>
      

      {isBookAvailable ? (
        <View style={styles.bookContainer}>
          <Image source={require("../assets/images/digital_electronics.png")} style={styles.image} />
          <Text style={styles.title}>{bookDetails.title}</Text>
          <Text style={styles.author}>{bookDetails.author}</Text>

          <Text style={styles.rating}>Rating: ⭐⭐⭐⭐⭐</Text>
          <Text style={styles.genre}>Genre: {bookDetails.genre}</Text>

          <Text style={styles.description}>{bookDetails.description}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save to Wishlist</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.unavailableContainer}>
          <Text style={styles.unavailableText}>WISHLIST</Text>
          <Image source={{ uri: bookDetails.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{bookDetails.title}</Text>
          <Text style={styles.author}>{bookDetails.author}</Text>

          <Text style={styles.rating}>Rating: ⭐⭐⭐⭐⭐</Text>
          <Text style={styles.genre}>Genre: {bookDetails.genre}</Text>

          <Text style={styles.takenUntil}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Taken until: {bookDetails.takenUntil}
            </Text>
          </Text>

          <Text style={styles.notificationText}>
            You will be notified as soon as the book becomes available. Please
            check your notifications for updates!
          </Text>
          
        </View>
        
        
      )}
    
    </View>
    <Footer />
    </view>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#2D7F5E",
    textAlign: "center",
    marginBottom: 20,
  },
  bookContainer: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 220,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  rating: {
    fontSize: 16,
    marginVertical: 5,
  },
  genre: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#5DB6A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  unavailableContainer: {
    alignItems: "center",
  },
  unavailableText: {
    fontSize: 22,
    fontStyle: "italic",
    color: "gray",
  },
  takenUntil: {
    fontSize: 16,
    marginVertical: 5,
  },
  notificationText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
    color: "#777",
  },
});

export default Wishlist;
