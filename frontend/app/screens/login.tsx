import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!memberId || !password) {
      Alert.alert("Error", "Please enter Member ID and Password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_id: memberId.trim(),
          date_of_birth: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      Alert.alert("Login Successful", `Welcome ${data.user.name}!`);
      router.replace("/mainpage"); // Navigate to main page

    } catch (error) {
      Alert.alert("Login Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LiBreeze</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Member ID"
        value={memberId}
        onChangeText={setMemberId}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your DOB (YYYY-MM-DD)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in</Text>}
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#5ABAB7",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 20,
    fontSize: 16,
    color: "#5ABAB7",
  },
  input: {
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderColor: "#5ABAB7",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#888",
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5ABAB7",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

