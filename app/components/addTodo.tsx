import axios from 'axios';
import React, { useState } from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import CButton from './CButton';

interface addTodoProps {

}

const AddTodo: React.FC<addTodoProps> = ({ }) => {

    const [todo, setTodo] = useState("");
    const onChangeHandler = (val: string) => {
        setTodo(val);
    }

    //AXIOS _POST new todo
    const NewTodo = async () => {

    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='new todo'
                onChangeText={onChangeHandler}
            />
            <CButton customContainerStyle={styles.submitBtn} customTextStyle={styles.text} onPress={() => { console.log(todo) }}>Submit</CButton>
        </View>
    );
}
export default AddTodo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: 'stretch',
        flex: 0.2,
        width: '80%',
        marginVertical: 5,
    },
    input: {
        flex: 0.75,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 3,
        color: 'white',
    },
    submitBtn: {
        flex: 0.2,
        height: '85%',
        backgroundColor: "powderblue",
        marginLeft: 'auto',
        marginTop: 5,
        borderRadius: 20,
    },
    text: {
        fontSize: 12,
        color: 'midnightblue',
    },
})