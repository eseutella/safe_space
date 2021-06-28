import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import FormButton from '../components/login/FormButton';
import { CommonActions } from "@react-navigation/native";
import firebase from '../api/Firebase';

const SettingsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
{/*            <FormButton buttonTitle='Logout' onPress={() =>
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                }))}
            />*/}
            <FormButton
                buttonTitle='Logout'
                onPress={() => {firebase.auth().signOut()}}
            />
        </View>
    );
};

export default SettingsScreen;

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