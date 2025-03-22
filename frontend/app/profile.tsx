import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/header";

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View>
    <Header />
    <View style={styles.container}>
        
      <View style={styles.header}>
        <Image source={require("../assets/images/profile.png")} style={styles.profileImage} />
        <Text style={styles.name}>POOJA DAS</Text>
        <Text style={styles.email}>22z396@psgtech.ac.in</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/userdetails")}>
        <Text style={styles.buttonText}>USER DETAILS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/borrowingactivity")}>
        <Text style={styles.buttonText}>BORROWING ACTIVITY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/wishlist")}>
        <Text style={styles.buttonText}>WISH LIST</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    padding: 70,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    backgroundColor: "#C0E8D5",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: "#2D7F5E",
    fontSize: 14,
  },
  button: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D7F5E",
  },
});

export default ProfileScreen;
