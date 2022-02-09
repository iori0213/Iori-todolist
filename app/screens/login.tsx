import React, { useState, useCallback } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, Modal, Pressable } from 'react-native'
import Header from '../components/Header'
import CButton from '../components/CButton'
import LoginCard from '../components/LoginCard'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native-elements/dist/buttons/Button';

const localhost = "192.168.43.234"
const user_baseURL = `http://${localhost}:5000/api/v1/user`;

interface LoginScreenProps {
  navigation: any;
}

//Login screen start from here!!
const Login = (prop: LoginScreenProps) => {
  const [username, setUsername] = useState("");

  //SECTION Functions　login button function // variable scope
  //SECTION Login
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
          setLoginV(!loginV)
        }
      })
    }
  }
  //!SECTION
  //SECTION Register
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
          setRegisterSuccessV(!registerSuccessV);
        } else {
          //account already existed
          console.log("Username has been registered, please login or change a username.")
          setRegisterFailedV(!registerFailedV);
        }
      })
    }
  }
  //!SECTION
  //SECTION ChangeHandler
  const changeHandlere = (val: string) => {
    setUsername(val)
  }
  //!SECTION
  //!SECTION

  //SECTION - ModalStatus
  const [loginV, setLoginV] = useState(false);
  const [registerSuccessV, setRegisterSuccessV] = useState(false);
  const [registerFailedV, setRegisterFailedV] = useState(false);
  //!SECTION

  return (
    <View style={{ backgroundColor: 'steelblue', flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
        <Header title='Log in' />
      </SafeAreaView>
      <View style={styles.content}>
        {/*   //SECTION - Modals */}
        {/* //SECTION - LoginFailed */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={loginV}
          onRequestClose={() => {
            setLoginV(!loginV);
          }}
        >
          <LoginCard
            message='Please register this username to login.'
            // status={loginV}
            func={() => setLoginV(!loginV)}
          ></LoginCard>
        </Modal>
        {/* //!SECTION */}
        {/* //SECTION - RegisterSuccess   */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={registerSuccessV}
          onRequestClose={() => {
            setRegisterSuccessV(!registerSuccessV);
          }}
        >
          <LoginCard
            message='Register success, please login with the username.'
            func={() => setRegisterSuccessV(!registerSuccessV)}
          ></LoginCard>
        </Modal>
        {/* //!SECTION */}
        {/* //SECTION RegisterFailed */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={registerFailedV}
          onRequestClose={() => {
            setRegisterFailedV(!registerFailedV);
          }}
        >
          <LoginCard
            message='Username has been registered, please login or change a username.'
            func={() => setRegisterFailedV(!registerFailedV)}
          ></LoginCard>
        </Modal>
        {/* !SECTION */}
        {/* !SECTION */}
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
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  modalBtn: {
    backgroundColor: "#F194FF",
    alignItems: 'center',
    marginTop: '5%',
    padding: 10,
    width: '20%',
    borderRadius: 50,
    elevation: 2,
  },
  modalText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },


});

export default Login
