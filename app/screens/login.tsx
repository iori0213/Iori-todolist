import React, { useState, useCallback } from 'react'
import { FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native'
import Header from '../components/header'
import CButton from '../components/CButton'
import axios from 'axios';

const user_baseURL = "http://192.168.43.234:5000/api/v1/user";
interface LoginScreenProps {
  navigation: any;
}

const Login = (prop: LoginScreenProps) => {

  const [username, setUsername] = useState("");

  //login button function // variable scope
  const login = async () => {
    axios({
      method: "post",
      url: `${user_baseURL}/login/${username}`, //
    }).then((res) => {
      return res.data.account_status;
    }).then((status) => {
      if (status) {
        prop.navigation.navigate('Home')
      } else {
        console.log("NOOOOO")
      }
    })
  }


  const changeHandlere = (val: string) => {
    setUsername(val)
  }

  // const register = async ({ username }) => {
  //   axios.post({
  //     method: 
  //   })
  // }
  return (
    <View>
      <Header />
      <View style={styles.content}>
        {/* <View style={styles.data}>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Text>{item.key} : {item.userName}</Text>
            )}
          />
        </View> */}
        <Text>Enter name : </Text>
        <TextInput
          style={styles.input}
          placeholder='User Name'
          onChangeText={changeHandlere}
        />
        <Button
          onPress={login} //onPress={void}
          title="Log in"
          color="#841584"
        />
        <CButton onPress={login} >
          Login
        </CButton>
        <View style={styles.little_space}></View>
        <Button
          onPress={login}
          title="Register"
          color="#841584"
        />
      </View>
    </View>
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
