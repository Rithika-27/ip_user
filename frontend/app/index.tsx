import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/second"); // ✅ Use replace to prevent going back to the splash screen
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LiBreeze</Text>
      <Image
        source={require("../assets/images/reading.png")}
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
    backgroundColor: "#5ABAB7",
  },
  text: {
    fontSize: 80,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  image: {
    width: 450,
    height: 400,
  },
});
