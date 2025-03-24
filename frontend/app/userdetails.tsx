import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/header";
import Footer from "../components/footer"

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/profile/getDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.user) {
          setUser(response.data.user);
        } else {
          setError("User details not found.");
        }
      } catch (err) {
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#EAF7F1" }}>
      <Header />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#5ABAB7" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {/* Profile Header */}
            <View style={styles.header}>
              <Image source={require("../assets/images/profile.png")} style={styles.profileImage} />
              <Text style={styles.name}>{user?.name }</Text>
              <Text style={styles.rollNumber}>{user?.member_id || "Not Available"}</Text>
            </View>

            {/* User Details Section */}
            <Text style={styles.sectionTitle}>USER DETAILS</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detail}><Text style={styles.bold}>Name:</Text> {user?.name || "Not Available"}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Roll Number:</Text> {user?.member_id || "Not Available"}</Text>
              <Text style={styles.detail}>
              <Text style={styles.bold}>Email ID:</Text> {user?.email || (user?.member_id ? `${user.member_id}@gmail.com` : "Not Available")}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Phone Number:</Text> {user?.mobile || "Not Available"}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Department:</Text> {user?.department || "Not Available"}</Text>
              <Text style={styles.detail}><Text style={styles.bold}>Year/Semester:</Text> {user?.year || "Not Available"}</Text>
            </View>

            
            
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EAF7F1" },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: "bold" },
  rollNumber: { fontSize: 14, color: "gray" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  detailsContainer: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 10, elevation: 2 },
  bookContainer: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 10, marginVertical: 5, elevation: 2 },
  detail: { fontSize: 14, marginVertical: 5 },
  bold: { fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
  status: { fontWeight: "bold" },
  noDataText: { fontSize: 14, color: "gray", textAlign: "center", marginTop: 10 },
});

export default UserDetails;
