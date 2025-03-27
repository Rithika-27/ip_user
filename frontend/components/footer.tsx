import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const Footer = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#F5F5F5",
        borderTopWidth: 1,
        borderColor: "#E0E0E0",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/mainpage")}>
        <FontAwesome5 name="home" size={24} color="#2D2D4B" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/mybooks")}>
        <FontAwesome5 name="book" size={24} color="#2D2D4B" />
      </TouchableOpacity>

      

      <TouchableOpacity onPress={() => router.push("/wishlist")}>
        <FontAwesome5 name="heart" size={24} color="#2D2D4B" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/profile")}>
        <FontAwesome5 name="user" size={24} color="#2D2D4B" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
