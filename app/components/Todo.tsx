import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// interface item {
//     "id": string;
//     "status": boolean;
//     "todo": string;
//     "userName": string;
// }

export default function TodoItem({ item }: any) {
    return (
        <TouchableOpacity>
            <Text style={styles.item}>{item.todo}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
    }
})