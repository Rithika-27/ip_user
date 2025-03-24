import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Footer from "../components/footer";

const { width } = Dimensions.get("window");

const suggestionData = [
  { title: "Digital Electronics", image: require("../assets/images/digital_electronics.png") },
  { title: "Computer Science", image: require("../assets/images/computer_science.png") },
  { title: "Metallurgy", image: require("../assets/images/mb.jpg") },
  { title: "Physics", image: require("../assets/images/Physics.jpg") },
  { title: "Mathematics", image: require("../assets/images/maths.avif") }
];

const categoryData = [
  { name: "Civil", image: require("../assets/images/civil.png") },
  { name: "Mechanical", image: require("../assets/images/mechanical.jpg") },
  { name: "Computer Science", image: require("../assets/images/computer.jpg") },
  { name: "Electronics", image: require("../assets/images/electronics.jpg") },
  { name: "Metallurgy", image: require("../assets/images/metallurgy.jpg") },
  { name: "Textile", image: require("../assets/images/textile.jpg") },
  { name: "Automobile", image: require("../assets/images/auto.jpg") },
  { name: "Biomedical", image: require("../assets/images/bio.jpg") },
  { name: "Production", image: require("../assets/images/pro.jpg") },
  { name: "Robotics", image: require("../assets/images/Robo.jpg") },
  { name: "BioTech", image: require("../assets/images/BioT.jpg") },
  { name: "FashionTech", image: require("../assets/images/FT.jpg") },
];

export default function MainPage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>LiBreeze</Text>
        <TouchableOpacity>
          <Image source={require("../assets/images/bell.png")} style={styles.bellIcon} />
        </TouchableOpacity>
      </View>

      {/* Suggestions Section */}
      <View style={styles.suggestionContainer}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <View style={styles.suggestionBackground}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.suggestionScroll}>
            {suggestionData.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.suggestionItem, { width: 150 }]}> 
                <Image source={item.image} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#5ABAB7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  sectionTitle: {
    paddingLeft: 20,
    fontSize: 24,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  suggestionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  suggestionScroll: {
    flexDirection: "row",
  },
  suggestionBackground: {
    paddingLeft: 20,
  },
  suggestionItem: {
    alignItems: "center",
    marginRight: 15,
    width: 180,
    height: 220,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "center",
  },
  bookImage: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  categoryItem: {
    width: "32%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
