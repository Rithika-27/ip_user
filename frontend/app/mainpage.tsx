import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Footer from "../components/footer";
import Navbar from "../components/header"

export default function MainPage() {
  const router = useRouter();
  const [suggestionData, setSuggestionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/suggestbook/random")
      .then((response) => response.json())
      .then((data) => {
        setSuggestionData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const categoryData = [
    { name: "Civil", image: require("../assets/images/civil.png") },
    { name: "Mechanical", image: require("../assets/images/mechanical.jpg") },
    { name: "Computer Science", image: require("../assets/images/computer.jpg") },
    { name: "Electronics", image: require("../assets/images/electronics.jpg") },
    { name: "Metallurgy", image: require("../assets/images/metallurgy.jpg") },
    { name: "Textile", image: require("../assets/images/textile.jpg") },
    { name: "AutoMobile", image: require("../assets/images/auto.jpg") },
    { name: "Biomedical", image: require("../assets/images/bio.jpg") },
    { name: "Production", image: require("../assets/images/pro.jpg") },
    { name: "Robotics", image: require("../assets/images/Robo.jpg") },
    { name: "BioTech", image: require("../assets/images/BioT.jpg") },
    { name: "FashionTech", image: require("../assets/images/FT.jpg") },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Navbar />
      {/* Suggestions Section */}
      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Suggestions</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#5ABAB7" />
  ) : suggestionData && Array.isArray(suggestionData) && suggestionData.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
      {suggestionData.map((item, index) => (
        <TouchableOpacity key={index} style={styles.suggestionItem}>
          <Image source={{ uri: item.image }} style={styles.bookImage} />
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>by {item.author}</Text> 
        </TouchableOpacity>
      ))}
    </ScrollView>
  ) : (
    <Text style={styles.noDataText}>No suggestions available</Text>
  )}
</View>


      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.grid}>
          {categoryData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => router.push(`/category?name=${encodeURIComponent(item.name)}`)}
            >
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 20, backgroundColor: "#5ABAB7" },
  title: { fontSize: 28, fontWeight: "bold", color: "white" },
  sectionTitle: { paddingLeft: 20, fontSize: 24, fontWeight: "900", textTransform: "uppercase", marginBottom: 10, fontFamily: "Arial" },
  bellIcon: { width: 24, height: 24 },
  noDataText: { textAlign: "center", fontSize: 16, color: "gray", marginVertical: 10 },

  // Suggestions Section
  horizontalScroll: { paddingHorizontal: 10 },
  suggestionItem: { 
    width: 160, 
    height: 220, 
    marginHorizontal: 10, 
    borderRadius: 10, 
    backgroundColor: "#fff", 
    justifyContent: "center", 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4 
  },
  bookImage: { width: "100%", height: "75%", borderRadius: 10 },
  bookTitle: { fontSize: 12, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  bookAuthor:{fontSize: 12, fontWeight: "regular", marginTop: 10, textAlign: "center"},
  // Categories Section
  section: { paddingHorizontal: 20, marginTop: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  categoryItem: { width: "30%", aspectRatio: 1, marginBottom: 10, borderRadius: 10, overflow: "hidden" },
  categoryImage: { width: "100%", height: "100%" },
  categoryText: { position: "absolute", bottom: 10, left: 10, fontSize: 16, fontWeight: "bold", color: "white" },
});
