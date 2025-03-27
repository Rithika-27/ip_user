import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>LiBreeze</Text>
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#5ABAB7",
  },
  title: {
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});
