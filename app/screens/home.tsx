import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Alert } from "react-native";
import { Card } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import CButton from "../components/CButton";
import TodoItem from "../components/Todo"
import Header from "../components/Header";
import LoginCard from "../components/LoginCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons'

interface HomeScreenProps {
  navigation: any;
}

const localhost = "192.168.43.234"
const todo_baseURL = `http://${localhost}:5000/api/v1/todo`;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home: React.FC<HomeScreenProps> = (prop) => {

  const [username, setUsername] = useState("");
  const [ctodos, setCtodos] = useState<Todo[]>([]);
  const [utodos, setUtodos] = useState<Todo[]>([]);
  const [ntodo, setNTodo] = useState("");
  const [ntodoModal, setNtodoModal] = useState(false);

  // Input text handler
  const onChangeHandler = (val: string) => {
    setNTodo(val);
  }

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
  const newUTodo = async () => {
    if (ntodo) {
      await axios({
        method: 'post',
        url: `${todo_baseURL}/`,
        data: {
          todo: ntodo,
          userName: username,
        }
      });
      await getUTodo(username);
    } else {
      setNtodoModal(!ntodoModal);
    }
  }

  // AXIOS _PUT toggle todo status
  const toggleTodo = async (InTodo: string, InStatus: boolean) => {
    await axios({
      method: 'put',
      url: `${todo_baseURL}/`,
      data: {
        userName: username,
        todo: InTodo,
        status: InStatus
      }
    })
    //Criteria
    //change Utodo to Ctodo
    if (!InStatus) {
      const Criteria = utodos.filter(todo => todo.todo == InTodo && todo.status == InStatus)
      setUtodos(utodos.filter(utodo => utodo.todo != InTodo))
      setCtodos(prev => (prev.concat(Criteria)))
    }
    //change Ctodo to Utodo
    else {
      const Criteria = ctodos.filter(todo => todo.todo == InTodo && todo.status == InStatus)
      setCtodos(ctodos.filter(utodo => utodo.todo != InTodo))
      setUtodos(prev => (prev.concat(Criteria)))
    }
  }

  // AXIOS - Delete todo
  const deleteTodo = async (todo: string, status: boolean) => {
    await axios({
      method: 'DELETE',
      url: `${todo_baseURL}/`,
      data: {
        userName: username,
        todo: todo,
        status: status,
      }
    }).then((res) => {
      console.log(res.data);
      if (status) {
        //Ctodo
        if (res.data.status) {
          const temp = ctodos.filter(item => item.todo != todo)
          setCtodos(temp);
          Alert.alert(res.data.message);
        } else {
          Alert.alert(res.data.message);
        }
      } else {
        //Utodo
        if (res.data.status) {
          const temp = utodos.filter(item => item.todo != todo)
          setUtodos(temp);
          Alert.alert(res.data.message);
        } else {
          Alert.alert(res.data.message);
        }
      }
    })
  }

  //ANCHOR log out function
  const logout = () => {
    SecureStore.deleteItemAsync("usrename")
      .then(() => {
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
      <SafeAreaView style={styles.headerContainer}>
        <Header title={username} />
        <View style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout() }}>
            <FontAwesome name="sign-out" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={ntodoModal}
          onRequestClose={() => {
            setNtodoModal(!ntodoModal);
          }}
        >
          <LoginCard
            message='The todo is empty, please enter something!'
            func={() => setNtodoModal(!ntodoModal)}
          ></LoginCard>
        </Modal>
        <View style={styles.AddContainer}>
          <TextInput
            style={styles.input}
            placeholder='new todo'
            placeholderTextColor={'white'}
            onChangeText={onChangeHandler}
          />
          <CButton customContainerStyle={styles.submitBtn} customTextStyle={styles.SBtext} onPress={() => newUTodo()}>Submit</CButton>
        </View>
        <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
          <Card.Title>Uncompleted Todo</Card.Title>
          <Card.Divider color="steelblue" width={0.5} />
          <FlatList
            style={styles.list}
            data={utodos}
            keyExtractor={(_, index) => 'key' + index}
            renderItem={({ item }) => {
              return (
                <TodoItem
                  prop={item}
                  funcD={() => deleteTodo(item.todo, item.status)}
                  funcT={() => toggleTodo(item.todo, item.status)}
                />
              )
            }}
          />
        </Card>
        <Card containerStyle={styles.card_out} wrapperStyle={styles.card_in}>
          <Card.Title>Completed Todo</Card.Title>
          <Card.Divider color="steelblue" width={0.5} />
          <FlatList
            style={styles.list}
            data={ctodos}
            keyExtractor={(_, index) => 'key' + index}
            renderItem={({ item }) => {
              return (
                <TodoItem
                  prop={item}
                  funcD={() => deleteTodo(item.todo, item.status)}
                  funcT={() => toggleTodo(item.todo, item.status)} />
              )
            }}
          />
        </Card>
        {/* <CButton onPress={() => { logout() }} customContainerStyle={styles.logoutBtn} customTextStyle={{ color: 'darkblue' }}>log out</CButton> */}
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  title: {
    marginLeft: '5%',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  card_out: {
    // width: windowWidth - 40,
    flex: 1,
    borderRadius: 40,
    backgroundColor: '#eee',
    marginHorizontal: '7%',
    marginVertical: 5,
    marginBottom: 5,
  },
  card_in: {
    // flex: 1,
    backgroundColor: '#eee',
  },
  list: {
    flex: 0.8,
    width: "100%",
  },
  logoutBtn: {
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
  },
  AddContainer: {
    flexDirection: "row",
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
    height: '90%',
    backgroundColor: "powderblue",
    marginLeft: 'auto',
    marginTop: 5,
    borderRadius: 20,
  },
  SBtext: {
    fontSize: 12,
    color: 'midnightblue',
  },
})
