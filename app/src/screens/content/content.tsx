import React from "react";
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

export function Content(props: any): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.contentContainer}>
      <Image source={require("../../assets/images/default-food.png")}  style={styles.image} resizeMode="contain" />
      <Text style={styles.text} numberOfLines={1}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        display: "flex",
        backgroundColor: "white",
        margin: 10,
        borderRadius: 20,
        width: 100,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    image: { width: 80, height: 80 },
    text: {
      color: colors.text,
      paddingHorizontal: 10
    },
});