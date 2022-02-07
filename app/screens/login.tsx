import React, { useState, useCallback } from 'react'
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert, SafeAreaView } from 'react-native'
import Header from '../components/Header'
import CButton from '../components/CButton'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const localhost = "192.168.43.234"
const user_baseURL = `http://${localhost}:5000/api/v1/user`;

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
    <View style={{ backgroundColor: 'steelblue', flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
        <Header title='Log in' />
      </SafeAreaView>
      <View style={styles.content}>
        <Text style={{ color: 'white', fontSize: 18 }}>Enter name : </Text>
        <TextInput
          style={styles.input}
          placeholder='User Name'
          placeholderTextColor={'white'}
          onChangeText={changeHandlere}
        />
        <CButton
          onPress={() => login()}
          customContainerStyle={styles.login_btn}
          customTextStyle={{ color: 'white' }}
        >Login</CButton>
        <CButton
          onPress={() => register()}
          customContainerStyle={styles.login_btn}
          customTextStyle={{ color: 'white' }}
        >Register</CButton>

      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    // // flex: 0.05,
    // height: '5%',
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    paddingTop: '10%',
    borderBottomWidth: 3,
    borderBottomColor: 'white',
    marginHorizontal: '2%'
  },
  content: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'white',
    padding: 8,
    margin: 10,
    width: 200,
    color: 'white',
  },
  data: {
    borderWidth: 1,
    borderColor: '#777',
    height: 150,
  },
  login_btn: {
    width: '25%',
    alignContent: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'white',
    marginTop: '5%'
  },
  little_space: {
    height: 5,
  }

});

export default Login
