import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Colors } from 'react-native-paper';

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen</Text>
            <IconButton
                icon="dots-horizontal"
                color={Colors.grey600}
                size={30}
                onPress={() => navigation.navigate('Settings')}
                style={styles.iconStyle}
            />
        </View>
    );
};

export default ProfileScreen;

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
    },
    iconStyle: {
        position: 'absolute',
        right: 5,
        top: 40,
    }
});