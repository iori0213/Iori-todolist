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
        height: 60,
        paddingTop: 20,
        backgroundColor: 'steelblue',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',

    }
})
