import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";
const UserDetails = () => {
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

      <Text style={styles.sectionTitle}>USER DETAILS</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}><Text style={styles.bold}>Name:</Text> Pooja Das</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Roll Number:</Text> 22Z396</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Email ID:</Text> 22z396@psgtech.ac.in</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Phone Number:</Text> 1234567891</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Department:</Text> CSE</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Year/Semester:</Text> Third Year, Semester VI</Text>
      </View>
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
  detailsContainer: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 10, elevation: 2 },
  detail: { fontSize: 14, marginVertical: 5 },
  bold: { fontWeight: "bold" },
});

export default UserDetails;
