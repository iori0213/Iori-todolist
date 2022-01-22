import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Router from './routes/router';


const login = () => {

}


const App = () => {
  return (
    <Router />
  );
};

export default App;


// const styles = StyleSheet.create({
//   content: {
//     paddingTop: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: 'lightgrey',
//     padding: 8,
//     margin: 10,
//     width: 200
//   },
//   data: {
//     borderWidth: 1,
//     borderColor: '#777',
//     height: 150,
//   },
//   login_btn: {
//     width: 200,
//     borderWidth: 2,
//     borderColor: 'skyblue',
//     padding: 5,
//     marginTop: 5,
//     alignItems: 'center',
//   }

// });
