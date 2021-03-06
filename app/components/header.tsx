import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface prop {
  title: string;
}


const Header: React.FC<prop> = (prop) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{prop.title}</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 60,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    // lineHeight: 60,
  }
})
