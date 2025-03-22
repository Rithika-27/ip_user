import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";
const BorrowingActivity = () => {
  const router = useRouter();

  return (
    <View>
        <Header />
    
    <View style={styles.container}>
     

      <View style={styles.header}>
        <Image source={require("../assets/images/profile.png")} style={styles.profileImage} />
        <Text style={styles.name}>POOJA DAS</Text>
        <Text style={styles.rollNumber}>22Z396</Text>
      </View>

      <Text style={styles.sectionTitle}>BORROWING ACTIVITY</Text>

      <View style={styles.infoBox}>
        <Text style={styles.bold}>Books Overdue:</Text>
        <Text>Introduction to the Theory of Computation - Michael Sipser</Text>

        <TouchableOpacity 
          style={styles.payButton} 
          onPress={() => router.push("/fine")}
        >
          <Text style={styles.buttonText}>PAY FINE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.bold}>Borrowing History:</Text>
        <Text>Python Crash Course - Eric Matthes</Text>
        <Text style={styles.returned}>✅ RETURNED</Text>
      </View>

      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={() => router.push("/mybooks")}
      >
        <Text style={styles.buttonText}>View My Books</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 70, backgroundColor: "#EAF7F1" },
  backButton: { position: "absolute", top: 10, left: 10 },
  backText: { fontSize: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: "bold" },
  rollNumber: { fontSize: 14, color: "gray" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  infoBox: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 10, marginBottom: 10 },
  bold: { fontWeight: "bold" },
  returned: { color: "green", fontWeight: "bold" },
  payButton: { backgroundColor: "#FF6961", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  viewButton: { backgroundColor: "#5ABAB7", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
});

export default BorrowingActivity;
