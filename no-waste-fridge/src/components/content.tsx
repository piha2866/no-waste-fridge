import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../styles/colors";

export function Content(props: any): React.JSX.Element {
  return (
    <View style={styles.contentContainer}>
        <View>
          <Image source={require("../assets/images/default-food.png")}  style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>{props.name}</Text>
        </View>
    </View>
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
    },
    textContainer: {
      paddingHorizontal: 4,
    }
});