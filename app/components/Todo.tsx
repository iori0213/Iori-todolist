import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import CButton from "./CButton";

// interface item {
//     "id": string;
//     "status": boolean;
//     "todo": string;
//     "userName": string;
// }

export default function TodoItem({ item }: any) {
    return (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.todo}>{item.todo}</Text>
            <CButton customContainerStyle={styles.deleteBtn} customTextStyle={styles.text}>Delete</CButton>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignContent: 'stretch',
        width: '90%',
        padding: 10,
        marginTop: 10,
        marginHorizontal: '5%',
        borderColor: "rosybrown",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10,
    },
    todo: {
        marginTop: 10,
        alignContent: "center",
        justifyContent: "center",
    }
    ,
    deleteBtn: {
        backgroundColor: "powderblue",
        marginLeft: 'auto',
        width: '17%',
    },
    text: {
        color: 'navy',
        fontSize: 12,
    }
})