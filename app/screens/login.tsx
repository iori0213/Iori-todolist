import React, { useState, useCallback } from 'react'
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import Header from '../components/Header'
import CButton from '../components/CButton'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const user_baseURL = "http://192.168.43.234:5000/api/v1/user";
interface LoginScreenProps {
  navigation: any;
}

//Login screen start from here!!
const Login = (prop: LoginScreenProps) => {
  const [username, setUsername] = useState("");

  //login button function // variable scope
  const login = async () => {
    if (!username) {
      console.log('missing username input')
    } else {
      axios({
        method: "post",
        url: `${user_baseURL}/login/${username}`,
      }).then((res) => {
        return res.data.account_status;
      }).then((status) => {
        if (status) {
          //login success
          try {
            //save username to secureStore
            SecureStore.setItemAsync("username", username).then(() => {
              prop.navigation.navigate('Home');
            })
          } catch (e) {
            console.log(e)
          }
        }
        else {
          //login failed
          console.log("Please register this username to login.")
        }
      })
    }
  }

  const register = async () => {
    if (!username) {
      console.log('missing username input')
    } else {
      axios({
        method: "post",
        url: `${user_baseURL}/register/${username}`,
      }).then((res) => {
        return res.data.register_status;
      }).then((status) => {
        if (status) {
          //Register success
          console.log("Register success, please login with the username.")
        } else {
          //account already existed
          console.log("Username has been registered, please login or change a username.")
        }
      })
    }
  }

  const changeHandlere = (val: string) => {
    setUsername(val)
  }

  return (
    <View>
      <Header />
      <View style={styles.content}>
        <Text>Enter name : </Text>
        <TextInput
          style={styles.input}
          placeholder='User Name'
          onChangeText={changeHandlere}
        />
        <Button
          onPress={() => login()} //onPress={void}
          title="Log in"
          color="#841584"
        />
        <View style={styles.little_space}></View>
        <CButton onPress={() => login()} >
          Login
        </CButton>
        <View style={styles.little_space}></View>
        <Button
          onPress={() => register()}
          title="Register"
          color="#841584"
        />
        <CButton onPress={() => {
          Alert.alert(
            "Error",
            "Username must be more than 2 character",
            [{ text: "Cancel", style: "cancel" }],
            {
              cancelable: true,
            }
          );
        }} >test</CButton>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 8,
    margin: 10,
    width: 200
  },
  data: {
    borderWidth: 1,
    borderColor: '#777',
    height: 150,
  },
  login_btn: {
    width: 200,
    borderWidth: 2,
    borderColor: 'skyblue',
    padding: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  little_space: {
    height: 5,
  }

});

export default Login
