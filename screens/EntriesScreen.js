import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const EntriesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Entries Screen</Text>
        </View>
    );
};

export default EntriesScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});