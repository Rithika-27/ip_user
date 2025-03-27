import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Footer from "../components/footer";
import Navbar from "../components/header";
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
    
          const borrowedDate = new Date(book.borrowedDate);
          
          if (isNaN(borrowedDate.getTime())) {
            return { ...book, daysLeft: "Invalid Date", overdue: false, status: "Unknown" };
          }
    
          // Calculate due date
          const dueDate = new Date(borrowedDate);
          dueDate.setDate(dueDate.getDate() + 14);
    
          // Normalize to midnight to avoid time discrepancies
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          dueDate.setHours(0, 0, 0, 0);
    
          // Calculate difference in days
          const timeDifference = dueDate.getTime() - currentDate.getTime();
          const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Use Math.floor() instead of Math.ceil()
    
          console.log(`Book: ${book.title}, Due: ${dueDate.toISOString().split("T")[0]}, Today: ${currentDate.toISOString().split("T")[0]}, Days Left: ${daysLeft}`);
    
          return {
            ...book,
            dueDate: dueDate.toISOString().split("T")[0],
            daysLeft: daysLeft < 0 ? 0 : daysLeft, // Ensure overdue books don’t show positive days
            overdue: daysLeft < 0, 
            status: daysLeft < 0 ? "Pay Fine" : "Renew",
          };
        });
    
        setBooks(updatedBooks);
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
                    const routePath = book.status === "Renew" ? "/fine/" : "/fine/";
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
