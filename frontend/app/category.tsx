import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Footer from "../components/footer";

export default function CategoryPage() {
  const router = useRouter();

  const books = [
    { 
      title: "Principles of Geotechnical Engineering", 
      author: "Braja M. Das", 
      image: require("../assets/images/geotechnical_engineering.jpg") 
    },
    { 
      title: "Structural Analysis", 
      author: "R.C. Hibbeler", 
      image: require("../assets/images/structural_analysis.jpg") 
    },
    { 
      title: "Civil Engineering Materials", 
      author: "Shah & Karve", 
      image: require("../assets/images/civil_materials.webp") 
    },
    { 
      title: "Mechanics of Materials", 
      author: "R.C. Hibbeler", 
      image: require("../assets/images/mechanics_of_materials.jpg") 
    },
    { 
      title: "Design of Reinforced Concrete", 
      author: "Jack C. McCormac, James K. Nelson", 
      image: require("../assets/images/reinforced_concrete.jpg") 
    },
    { 
      title: "Transportation Engineering: An Introduction", 
      author: "C. Jotin Khisty, B. Kent Lall", 
      image: require("../assets/images/transportation_engineering.jpg") 
    },
    { 
      title: "Surveying: Principles and Applications", 
      author: "Barry F. Kavanagh, Tom Mastin", 
      image: require("../assets/images/surveying.jpg") 
    },
    { 
      title: "Concrete Technology", 
      author: "M. L. Gambhir", 
      image: require("../assets/images/concrete_technology.jpg") 
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>COMPUTER SCIENCE</Text>
        <TouchableOpacity>
          <Image source={require("../assets/images/bell.png")} style={styles.bellIcon} />
        </TouchableOpacity>
      </View>

      {/* Books Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Books (8)</Text>
        <View style={styles.grid}>
          {books.map((book, index) => (
            <TouchableOpacity key={index} style={styles.bookItem}>
              <Image source={book.image} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#5ABAB7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5ABAB7",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bookItem: {
    width: "47%",
    marginBottom: 15,
    alignItems: "center",
  },
  bookImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  bookAuthor: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#555",
    marginTop: 3,
    textAlign: "center",
  },
});