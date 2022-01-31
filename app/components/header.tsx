import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface prop {
  title: string;
}

const Header: React.FC<prop> = (prop) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{prop.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 60,
    backgroundColor: "steelblue",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "green",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingBottom: "8%",
    height: 24,
    borderWidth: 1,
    borderColor: "green",
  },
});
