import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";
const RenewScreen = () => {
  const router = useRouter();

  // Temporary data
  const title = "Introduction to Algorithms";
  const author = "Thomas H. Cormen";
  const dueDate = "Jan 10, 2025";
  const newDueDate = "Jan 24, 2025";
  const renewalsLeft = 2;

  return (
    <view>
        {/* Header */}
      <Header />
    
    <View style={styles.container}>
      

      {/* Main Text */}
      <Text style={styles.instructionText}>
        You're renewing a borrowed book. Please review the details below.
      </Text>

      {/* Book Details Box */}
      <View style={styles.bookDetails}>
        <Text style={styles.boldText}>Book Title: "{title}"</Text>
        <Text>Author: {author}</Text>
        <Text>Current Due Date: {dueDate}</Text>
        <Text>New Due Date: {newDueDate}</Text>
      </View>

      {/* Renewal Info */}
      <Text style={styles.renewalInfo}>
        You have {renewalsLeft} renewals remaining for this book
      </Text>

      {/* Confirmation Box */}
      <View style={styles.confirmBox}>
        <Text style={styles.confirmText}>
          Are you sure you want to renew "{title}"?
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => router.push("/renewsuccess")}
            style={styles.yesButton}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.noButton}>
            <Text style={styles.noButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Note */}
      <Text style={styles.note}>
        Books must be returned by the new due date to avoid late fees.
      </Text>
    </View>
    </view>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 70, backgroundColor: "#F7FCFA" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 10 },
  backText: { fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#5DB6A2" },
  searchButton: { padding: 10 },
  searchText: { fontSize: 18 },
  instructionText: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  bookDetails: {
    backgroundColor: "#EAF7F1",
    padding: 35,
    borderRadius: 10,
    marginBottom: 30,
  },
  boldText: { fontWeight: "bold" },
  renewalInfo: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginVertical: 10, fontStyle: "italic" },
  confirmBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  buttonRow: { flexDirection: "row", marginTop: 10, justifyContent: "space-around", width: "100%" },
  yesButton: {
    backgroundColor: "#5DB6A2",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  noButton: {
    borderColor: "#5DB6A2",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  noButtonText: { color: "#5DB6A2", fontWeight: "bold" },
  note: { fontSize: 12, textAlign: "center", marginTop: 15, color: "gray" },
});

export default RenewScreen;
