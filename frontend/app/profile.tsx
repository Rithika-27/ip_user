import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import Footer from "../components/footer";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("No token found, redirecting to login...");
          router.push("/screens/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/profile/getDetails", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile details");
        }

        const data = await response.json();
        setUser(data || {}); // Ensure user is always an object
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#5DB6A2" style={styles.loading} />;
  }

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={user?.profileImage ? { uri: user.profileImage } : require("../assets/images/profile.png")}
            style={styles.profileImage} 
          />
          
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/userdetails")}>
          <Text style={styles.buttonText}>USER DETAILS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/mybooks")}>
          <Text style={styles.buttonText}>BORROWING ACTIVITY</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/wishlist")}>
          <Text style={styles.buttonText}>WISH LIST</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EAF7F1",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
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
  detail: {
    fontSize: 16,
    color: "#2D7F5E",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    color: "#184E42",
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
