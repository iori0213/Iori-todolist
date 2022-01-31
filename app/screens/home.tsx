import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import CButton from "../components/CButton";
import Todo from "../components/Todo";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { localhost } from "../constants/env";

interface HomeScreenProps {
  navigation: any;
}

const todo_baseURL = `http://${localhost}:5000/api/v1/todo`;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home: React.FC<HomeScreenProps> = (prop) => {
  const [username, setUsername] = useState("");
  const [ctodos, setCtodos] = useState<Todo[]>([]);
  const [utodos, setUtodos] = useState<Todo[]>([]);
  const [ntodo, setNTodo] = useState("");

  // Input text handler
  const onChangeHandler = (val: string) => {
    setNTodo(val);
  };

  // AXIOS _GET uncompleted todos
  const getUTodo = async (username: string) => {
    await axios({
      method: "get",
      url: `${todo_baseURL}/uncompleted/${username}`,
    })
      .then((res) => {
        return res.data.uncompletedTodo;
      })
      .then((todos) => {
        setUtodos(todos);
      });
  };
  // AXIOS _GET completed todos
  const getCTodo = async (username: string) => {
    await axios({
      method: "get",
      url: `${todo_baseURL}/completed/${username}`,
    })
      .then((res) => {
        return res.data.completedTodo;
      })
      .then((todos) => {
        setCtodos(todos);
      });
  };

  // AXIOS _POST new todo
  const newUTodo = async () => {
    await axios({
      method: "post",
      url: `${todo_baseURL}/`,
      data: {
        todo: ntodo,
        userName: username,
      },
    });
    await getUTodo(username);
  };

  //_DEL log out function
  const logout = () => {
    SecureStore.deleteItemAsync("usrename").then(() => {
      // navigate to login screen after delete
      prop.navigation.navigate("Login");
    });
  };
  // Initial loading process setUsername and getCTodo
  useEffect(() => {
    //Initial Loading
    const InitialLoading = async () => {
      const name = await SecureStore.getItemAsync("username");
      if (name) {
        setUsername(name);
        getCTodo(name);
        getUTodo(name);
      } else {
        alert("Error : Invalid key !");
      }
    };
    //call function InitialLoading()
    InitialLoading();
  }, []);
  // !SECTION

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
        <Header title={username} />
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => {
              logout();
            }}
          >
            <FontAwesome name="sign-out" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <View style={styles.AddContainer}>
          <TextInput
            style={styles.input}
            placeholder="new todo"
            placeholderTextColor={"white"}
            onChangeText={onChangeHandler}
          />
          <CButton
            customContainerStyle={styles.submitBtn}
            customTextStyle={styles.SBtext}
            onPress={() => newUTodo()}
          >
            Submit
          </CButton>
        </View>
        <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
          <Card.Title>Uncompleted Todo</Card.Title>
          <Card.Divider color="steelblue" width={0.5} />
          <FlatList
            style={styles.list}
            data={utodos}
            keyExtractor={(_, index) => "key" + index}
            renderItem={({ item }) => {
              return <Todo item={item} />;
            }}
          />
        </Card>
        <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
          <Card.Title>Completed Todo</Card.Title>
          <Card.Divider color="steelblue" width={0.5} />
          <FlatList
            style={styles.list}
            data={ctodos}
            keyExtractor={(_, index) => "key" + index}
            renderItem={({ item }) => {
              return <Todo item={item} />;
            }}
          />
        </Card>
        {/* <CButton onPress={() => { logout() }} customContainerStyle={styles.logoutBtn} customTextStyle={{ color: 'darkblue' }}>log out</CButton> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.07,
    flexDirection: "row",
    backgroundColor: "steelblue",
    borderWidth: 1,
    borderColor: "red",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "steelblue",
  },
  card_out: {
    // width: windowWidth - 40,
    flex: 1,
    borderRadius: 40,
    backgroundColor: "#eee",
    marginHorizontal: "7%",
    marginVertical: 5,
    marginBottom: 5,
  },
  card_in: {
    backgroundColor: "#eee",
  },
  list: {
    flex: 0.8,
    width: "100%",
  },
  logoutBtn: {
    alignItems: "flex-end",
    backgroundColor: "steelblue",
  },
  AddContainer: {
    flexDirection: "row",
    alignContent: "stretch",
    flex: 0.2,
    width: "80%",
    marginVertical: 5,
  },
  input: {
    flex: 0.75,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 3,
    color: "white",
  },
  submitBtn: {
    flex: 0.2,
    height: "85%",
    backgroundColor: "powderblue",
    marginLeft: "auto",
    marginTop: 5,
    borderRadius: 20,
  },
  SBtext: {
    fontSize: 12,
    color: "midnightblue",
  },
});
