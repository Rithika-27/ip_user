import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function second() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LiBreeze</Text>
      <Text style={styles.subtitle}>Your book library {"\n"} at the office</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/login")}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/images/second_reading.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#5ABAB7",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5ABAB7",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 400,
    height: 300,
  },
});
