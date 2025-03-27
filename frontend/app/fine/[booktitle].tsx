import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";

const FinePaymentScreen = () => {
  const router = useRouter();
  const { booktitle, author, dueDate } = useLocalSearchParams();

  if (!booktitle || !author || !dueDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid Book Data</Text>
      </View>
    );
  }

  // Convert dueDate to a Date object
  const dueDateObj = new Date(dueDate);
  const currentDate = new Date();

  // Calculate the difference in days
  const timeDiff = currentDate - dueDateObj;
  const daysLate = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Calculate fine (₹2 per day late)
  const fine = daysLate > 0 ? daysLate * 2 : 0;

  const handleFinePayment = () => {
    Alert.alert("Payment Successful", `You have paid ₹${fine} successfully!`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7FCFA" }}>
      {/* Header */}
      <Header />

      <View style={styles.container}>
        <Text style={styles.instructionText}>Please review the details below:</Text>

        {/* Fine Details Box */}
        <View style={styles.bookDetails}>
          <Text style={styles.boldText}>📖 Book Title: "{booktitle}"</Text>
          <Text style={styles.normalText}>✍️ Author: {author}</Text>
          <Text style={styles.normalText}>📅 Due Date: {dueDate}</Text>
          {fine > 0 ? (
            <Text style={styles.fineText}>⚠️ DUE AMOUNT: ₹{fine}</Text>
          ) : (
            <Text style={styles.noFineText}>✅ No fine to pay!</Text>
          )}
        </View>

        {/* Fine Payment Confirmation */}
        {fine > 0 && (
          <>
            <Text style={styles.confirmText}>
              Please pay a fine of <Text style={styles.boldText}>₹{fine}</Text>.
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleFinePayment} style={styles.payButton}>
                <Text style={styles.buttonText}>Pay Fine</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F7FCFA" },
  errorText: { fontSize: 16, fontWeight: "bold", color: "red", textAlign: "center" },
  instructionText: { fontSize: 16, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  bookDetails: {
    backgroundColor: "#EAF7F1",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  boldText: { fontWeight: "bold", fontSize: 16 },
  normalText: { fontSize: 14, marginBottom: 5 },
  fineText: { fontSize: 18, fontWeight: "bold", color: "red", marginTop: 10 },
  noFineText: { fontSize: 16, fontWeight: "bold", color: "green", marginTop: 10 },
  confirmText: { fontSize: 14, textAlign: "center", marginBottom: 10 },
  buttonRow: { flexDirection: "row", marginTop: 20, justifyContent: "space-around" },
  payButton: {
    backgroundColor: "#5DB6A2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelButton: {
    borderColor: "#5DB6A2",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  cancelButtonText: { color: "#5DB6A2", fontWeight: "bold", textAlign: "center" },
});

export default FinePaymentScreen;
