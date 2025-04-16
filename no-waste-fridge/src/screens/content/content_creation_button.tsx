import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../../styles/colors";

export default function ContentCreationButton(props: any): React.JSX.Element {
    return (
        <TouchableOpacity style={styles.overlayButton}>
            <Text style={styles.text}>+</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    overlayButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: colors.text,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    text: {
        fontSize: 32,
        color: colors.background
    },
})