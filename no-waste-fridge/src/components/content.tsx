import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export function Content(props: any): React.JSX.Element {
  return (
    <View style={styles.contentContainer}>
        <View>
          <Image source={require("../assets/images/default-food.png")} />
        </View>
        <View>
            <Text>{props.name}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "white",
        margin: 10,
        borderRadius: 20,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    }
});