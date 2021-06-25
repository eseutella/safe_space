import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const TimetableScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Timetable Screen</Text>
        </View>
    );
};

export default TimetableScreen;

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