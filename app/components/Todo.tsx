import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import CButton from "./CButton";

// interface item {
//     "id": string;
//     "status": boolean;
//     "todo": string;
//     "userName": string;
// }
interface props {
  prop: Todo;
  funcT: () => void;
  funcD: () => void;
}

const TodoItem: React.FC<props> = ({ prop, funcT, funcD }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => funcT()}>
      <Text style={styles.todo}>{prop.todo}</Text>
      <CButton onPress={() => funcD()} customContainerStyle={styles.deleteBtn} customTextStyle={styles.text}>Delete</CButton>
    </TouchableOpacity>
  )
}

export default TodoItem;

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