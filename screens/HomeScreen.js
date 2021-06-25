import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import firebase from '../api/Firebase';



const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen {firebase.auth().currentUser.displayName}</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});