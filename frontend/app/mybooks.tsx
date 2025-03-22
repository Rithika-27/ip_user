import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Footer from "../components/footer"
import Header from "../components/header"
import { useRouter } from "expo-router"; // Importing router

const books = [
  {
    title: "Introduction to the Theory of Computation",
    author: "By Michael Sipser",
    status: "Pay Fine",
    overdue: true,
    image: require("../assets/images/book1.png"),
  },
  {
    title: "Introduction to Algorithms",
    author: "By Thomas H. Cormen",
    status: "Renew",
    daysLeft: "1 day left",
    image: require("../assets/images/book1.png"),
  },
  {
    title: "Modern Operating Systems",
    author: "By Andrew S. Tanenbaum",
    status: "Renew",
    daysLeft: "2 days left",
    image: require("../assets/images/book1.png"),
  },
  {
    title: "Data Structures Using C",
    author: "By Reema Thareja",
    status: "Renew",
    daysLeft: "3 days left",
    image: require("../assets/images/book1.png"),
  },
];

export default function MyBooksPage() {
  const router = useRouter(); // Using router for navigation

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <Header />

      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>My books ({books.length})</Text>
          {books.map((book, index) => (
            <View 
              key={index} 
              style={{ flexDirection: "row", backgroundColor: "white", padding: 15, borderRadius: 10, marginTop: 10, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}
            >
              {/* Book Image */}
              <Image source={book.image} style={{ width: 50, height: 70, borderRadius: 5, marginRight: 10 }} />

              {/* Book Details */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>{book.title}</Text>
                <Text style={{ fontSize: 12, color: "gray" }}>{book.author}</Text>
                {book.overdue ? (
                  <Text style={{ color: "red", fontSize: 12 }}>Overdue</Text>
                ) : (
                  <Text style={{ color: "gray", fontSize: 12 }}>{book.daysLeft}</Text>
                )}
              </View>

              {/* Button to Navigate */}
              <TouchableOpacity
                style={{
                  backgroundColor: book.overdue ? "#FF6B6B" : "#5ABAB7",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (book.status === "Renew") {
                    router.push("/renew");
                  } else {
                    router.push("/fine");
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>{book.status}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
