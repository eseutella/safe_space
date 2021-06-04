import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native';
import { CommonActions } from "@react-navigation/native";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import PasswordFormInput from "../components/PasswordFormInput";
import * as Animatable from 'react-native-animatable';
import firebase from '../api/Firebase';

const RegisterScreen = ({navigation}) => {
    /**const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState();*/
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValidUser: true,
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const handleUsernameChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                isValidUser: false
            });
        }
    }

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

    const handleConfirmPasswordChange = (val) => {
        if( data.password == val ) {
            setData({
                ...data,
                confirmPassword: val,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                confirmPassword: val,
                isValidConfirmPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        });
    }

    const register = async () => {
        if (data.username.length == 0 || data.email.length == 0
        || data.password.length == 0 || data.confirmPassword.length == 0) {
            Alert.alert('Error!', 'There are empty fields.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidEmail) {
            Alert.alert('Error!', 'Email address is badly formatted.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidUser) {
            Alert.alert('Error!', 'Username must be at least 4 characters long.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidPassword) {
            Alert.alert('Error!', 'Password must be at least 6 characters long.', [
                {text: 'Okay'}
            ]);
        } else if (!data.isValidConfirmPassword) {
            Alert.alert('Error!', 'Passwords do not match.', [
                {text: 'Okay'}
            ]);
        } else {
            try {
                const {response} = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
                if (response) {
                    await response.updateProfile ({ displayName: data.username });
                }
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                }))
            } catch (err) {
                Alert.alert('Error!', 'The email address is already in use by another account.', [
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
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={data.username}
                onChangeText={(val) => handleUsernameChange(val)}
                placeholderText="Username"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />

            { data.isValidUser ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be at least 4 characters long.</Text>
                </Animatable.View>
            }

            <FormInput
                labelValue={data.email}
                onChangeText={(val) => handleEmailChange(val)}
                placeholderText="Email"
                iconType="mail"
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

            <PasswordFormInput
                labelValue={data.confirmPassword}
                onChangeText={(val) => handleConfirmPasswordChange(val)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={data.confirmSecureTextEntry}
                pressFunction={updateConfirmSecureTextEntry}
                dataValue={data.confirmSecureTextEntry}
            />

            { data.isValidConfirmPassword ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Passwords do not match.</Text>
                </Animatable.View>
            }

            <FormButton
                buttonTitle="Sign Up"
                onPress={() => register()}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                        Terms of Service
                    </Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity onPress={() => alert('Policy Clicked!')}>
                    <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
                        Privacy Policy
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 120,
        width: 120,
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
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});