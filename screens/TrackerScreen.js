import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const TrackerScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tracker Screen</Text>
        </View>
    );
};

export default TrackerScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
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