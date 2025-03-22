import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const RenewSuccess = () => {
  const router = useRouter(); // Initialize useRouter inside the component

  return (
    <View style={{ padding: 20, alignItems: "center", flex: 1, justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#B2DFDB",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#00796B" }}>YAY!</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>Renewal Successful!</Text>
        <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>Happy Reading!</Text>
      </View>
      
      <TouchableOpacity
        onPress={() => router.push("/mainpage")}
        style={{
          marginTop: 20,
          padding: 10,
          borderColor: "#5DB6A2",
          borderWidth: 1,
          borderRadius: 5,
          width: 100,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#5DB6A2", fontWeight: "bold" }}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RenewSuccess;
