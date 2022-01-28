import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import CButton from "../components/CButton";
import Todo from "../components/Todo"
import Header from "../components/Header";

interface HomeScreenProps {
    navigation: any;
}


interface item {
    "id": string;
    "status": boolean;
    "todo": string;
    "userName": string;
}

const Home: React.FC<HomeScreenProps> = (prop) => {
    const todo_baseURL = "http://192.168.43.234:5000/api/v1/todo"

    const [username, setUsername] = useState("");
    const [ctodos, setCtodos] = useState<Todo[]>([]);
    const [utodos, setUtodos] = useState<Todo[]>([]);

    // AXIOS _GET uncompleted todos
    const getUTodo = async (username: string) => {
        await axios({
            method: "get",
            url: `${todo_baseURL}/uncompleted/${username}`,
        }).then((res) => {
            return res.data.uncompletedTodo
        }).then((todos) => {
            setUtodos(todos);
        })
    }
    // AXIOS _GET completed todos
    const getCTodo = async (username: string) => {
        await axios({
            method: "get",
            url: `${todo_baseURL}/completed/${username}`,
        }).then((res) => {
            return res.data.completedTodo
        }).then((todos) => {
            setCtodos(todos);
        })
    }
    // AXIOS _POST new todo

    //_DEL log out function
    const logout = () => {
        SecureStore.deleteItemAsync("usrename").then(() => {
            // navigate to login screen after delete
            prop.navigation.navigate('Login')
        })
    }
    // Initial loading process setUsername and getCTodo
    useEffect(() => {
        //Initial Loading
        const InitialLoading = async () => {
            const name = await SecureStore.getItemAsync('username');
            if (name) {
                setUsername(name);
                getCTodo(name);
                getUTodo(name);
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
            <Header title={username} />
            <View style={styles.body}>
                <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
                    <Card.Title>Uncompleted Todo</Card.Title>
                    <Card.Divider />
                    <FlatList
                        style={styles.list}
                        data={ctodos}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={({ item }) => {
                            return (
                                <Todo item={item} />
                            )
                        }}
                    />
                </Card>
                <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
                    <Card.Title>Completed Todo</Card.Title>
                    <Card.Divider style={{ borderBottomColor: 'black' }} />
                    <FlatList
                        style={styles.list}
                        data={utodos}
                        keyExtractor={(_, index) => 'key' + index}
                        renderItem={({ item }) => {
                            return (
                                <Todo item={item} />
                            )
                        }}
                    />
                </Card>
                <CButton onPress={() => { logout() }} customContainerStyle={styles.logoutBtn} customTextStyle={{ color: 'darkblue' }}>log out</CButton>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aaa'
    },
    card_out: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: '#eee',
        marginHorizontal: '7%',
    },
    card_in: {
        backgroundColor: '#eee',
    },
    list: {
        flex: 0.8,
        width: "100%",
    },
    logoutBtn: {
        backgroundColor: 'skyblue',
        margin: 5,
        borderRadius: 10,

    },
})
