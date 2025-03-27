import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";

const RenewScreen = () => {
  const router = useRouter();
  const { title, author, dueDate } = useLocalSearchParams();

  if (!title || !author || !dueDate) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
          Invalid Book Data
        </Text>
      </View>
    );
  }

  // Calculate new due date (14 days extension)
  const newDueDate = new Date(dueDate);
  newDueDate.setDate(newDueDate.getDate() + 14);

  return (
    <View style={{ flex: 1, backgroundColor: "#F7FCFA" }}>
      {/* Header */}
      <Header />

      <View style={styles.container}>
        <Text style={styles.instructionText}>
          You're renewing a borrowed book. Please review the details below.
        </Text>

        {/* Book Details Box */}
        <View style={styles.bookDetails}>
          <Text style={styles.boldText}>Book Title: "{title}"</Text>
          <Text style={styles.normalText}>Author: {author}</Text>
          <Text style={styles.normalText}>Current Due Date: {dueDate}</Text>
          <Text style={styles.normalText}>
            New Due Date: {newDueDate.toISOString().split("T")[0]}
          </Text>
        </View>

        {/* Renewal Information */}
        <Text style={styles.renewalInfo}>
          You have <Text style={styles.italicText}>2 renewals</Text> remaining for this book
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7FCFA" },
  instructionText: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  bookDetails: {
    backgroundColor: "#EAF7F1",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  boldText: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  normalText: { fontSize: 14 },
  renewalInfo: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  italicText: { fontStyle: "italic" },
  confirmBox: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  confirmText: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    width: "100%",
  },
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
