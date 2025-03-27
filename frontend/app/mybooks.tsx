import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Footer from "../components/footer";
import Navbar from "../components/header"
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login...");
          router.push("/screens/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/books/myBooks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.borrowing_activity) {
          console.error("No borrowing activity found.");
          return;
        }

        const updatedBooks = response.data.borrowing_activity.map(book => {
          if (!book.borrowedDate) {
            return { ...book, daysLeft: "Invalid Date", overdue: false, status: "Unknown" };
          }

          const borrowedDate = new Date(book.borrowedDate + "T00:00:00Z");

          if (isNaN(borrowedDate)) {
            return { ...book, daysLeft: "Invalid Date", overdue: false, status: "Unknown" };
          }

          const dueDate = new Date(borrowedDate);
          dueDate.setDate(dueDate.getDate() + 14);
          const currentDate = new Date();
          const daysLeft = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));

          return {
            ...book,
            dueDate: dueDate.toISOString().split("T")[0], // Storing due date
            daysLeft,
            overdue: daysLeft < 0,
            status: daysLeft < 0 ? "Pay Fine" : "Renew",
          };
        });

        setBooks(updatedBooks.filter(book => book));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <Navbar />
      <ScrollView>
     
        <View style={{ padding: 15 }}>
        
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
            My books ({books.length})
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#5ABAB7" />
          ) : (
            books.map((book, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 2,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>{book.title}</Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>{book.author}</Text>
                  {book.overdue ? (
                    <Text style={{ color: "red", fontSize: 12 }}>Overdue</Text>
                  ) : (
                    <Text style={{ color: "gray", fontSize: 12 }}>{book.daysLeft} days left</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: book.overdue ? "#FF6B6B" : "#5ABAB7",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    const routePath = book.status === "Renew" ? "/renew/" : "/fine/";
                    router.push({
                      pathname: `${routePath}${book.title}`,
                      params: {
                        title: book.title,
                        author: book.author,
                        dueDate: book.dueDate,
                      },
                    });
                  }}
                  
              
                >
                  <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>{book.status}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
