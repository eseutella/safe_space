import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Alert} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import PasswordFormInput from "../components/PasswordFormInput";
import firebase from '../api/Firebase';
import * as Animatable from "react-native-animatable";
import {CommonActions} from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
    /**const [email, setEmail] = useState();
    const [password, setPassword] = useState();*/
    const [data, setData] = useState({
        email: '',
        password: '',
        secureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidPassword: true,
    });

    const handleEmailChange = (val) => {
        if( val.includes('@') ) {
            setData({
                ...data,
                email: val,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                email: val,
                isValidEmail: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const login = async () => {
        if (data.email.length == 0 || data.password.length == 0) {
            Alert.alert('Error!', 'Email or Password cannot be empty.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidEmail) {
            Alert.alert('Error!', 'Email address is badly formatted.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidPassword) {
            Alert.alert('Error!', 'Password must be at least 6 characters long.', [
                {text: 'Okay'}
            ]);
        } else {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: "MainTab" }]
                }))
            } catch (error) {
                Alert.alert('Error!', 'Incorrect email or password.', [
                    {text: 'Okay'}
                ]);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/safe-space-icon.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Safe Space</Text>

            <FormInput
                labelValue={data.email}
                onChangeText={(val) => handleEmailChange(val)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            { data.isValidEmail ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Email address is badly formatted.</Text>
                </Animatable.View>
            }

            <PasswordFormInput
                labelValue={data.password}
                onChangeText={(val) => handlePasswordChange(val)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={data.secureTextEntry}
                pressFunction={updateSecureTextEntry}
                dataValue={data.secureTextEntry}
            />

            { data.isValidPassword ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be at least 6 characters long.</Text>
                </Animatable.View>
            }

            <FormButton
                buttonTitle="Sign In"
                onPress={() => login()}
            />

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={()=>{}}>
                <Text style={styles.navButtonText}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.navButtonText}>
                    Don't have an account? Register here!
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 25,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});