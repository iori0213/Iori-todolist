import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import CButton from "../components/CButton";
import Todo from "../components/Todo"

interface HomeScreenProps {
    navigation: any;
}

type todoArr = [
    {
        "id": string,
        "status": boolean,
        "todo": string,
        "userName": string,
    },
]

interface item {
    "id": string;
    "status": boolean;
    "todo": string;
    "userName": string;
}

const Home = (prop: HomeScreenProps) => {
    const todo_baseURL = "http://192.168.43.234:5000/api/v1/todo"

    const [username, setUsername] = useState("");
    const [ctodos, setCtodos] = useState<todoArr>();
    const [utodo, setUtodo] = useState([]);


    // AXIOS get request get the user's todo
    const getTodo = async (username: string) => {
        await axios({
            method: "get",
            url: `${todo_baseURL}/completedtodo/${username}`,
        }).then((res) => {
            return res.data.completedTodo
        }).then((todos) => {
            console.log("data:", todos);
            setCtodos(todos);
        }).then(() => console.log("Ctodos: ", ctodos))
    }
    //log out function
    const logout = () => {
        SecureStore.deleteItemAsync("usrename").then(() => {
            // navigate to login screen after delete
            prop.navigation.navigate('Login')
        })
    }
    // Initial loading process setUsername and getTodo
    useEffect(() => {
        //Initial Loading
        const InitialLoading = async () => {
            const name = await SecureStore.getItemAsync('username');
            if (name) {
                setUsername(name);
                getTodo(name);
            } else {
                alert("Error : Invalid key !");
            }
        }
        //call function InitialLoading()
        InitialLoading();
    }, []);
    // !SECTION

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>{username}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={ctodos}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item }) => {
                        return (
                            <Todo item={item} />
                        )
                    }}
                />
                <CButton onPress={() => { logout() }}>log out</CButton>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'coral',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',

    }
})
