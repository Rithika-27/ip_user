import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
const FinePaymentScreen = () => {
  const navigation = useNavigation();

  // Hardcoded book details (You can replace this with data from a global state or API)
  const book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dueDate: "2025-02-15",
    fine: "50", // Fine amount in ₹
  };

  const handleFinePayment = () => {
    Alert.alert("Payment Successful", "Your fine has been paid successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <view>
        <Header />
    
    <View style={{ padding: 70, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Please review the details below:
      </Text>
      <Text style={{ fontSize: 16 }}>📖 Book Title: "{book.title}"</Text>
      <Text style={{ fontSize: 16 }}>✍️ Author: {book.author}</Text>
      <Text style={{ fontSize: 16 }}>📅 Due Date: {book.dueDate}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "red", marginTop: 10 }}>
        ⚠️ DUE AMOUNT: {book.fine} ₹
      </Text>

      <Text style={{ fontSize: 16, marginTop: 10 }}>
        Please pay a fine of <Text style={{ fontWeight: "bold" }}>{book.fine} ₹</Text>.
      </Text>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleFinePayment}
          style={{
            backgroundColor: "#5DB6A2",
            padding: 12,
            flex: 1,
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Pay Fine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderColor: "#5DB6A2",
            borderWidth: 1,
            padding: 12,
            flex: 1,
            borderRadius: 5,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold", color: "#5DB6A2" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
    </view>
  );
};

export default FinePaymentScreen;
