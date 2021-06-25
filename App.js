import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabScreen from "./screens/MainTabScreen";
import SettingsScreen from "./screens/SettingsScreen";
import {View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firebase from './api/Firebase';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
    return (
        <AuthStack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={({navigation}) => ({
                    title: '',
                    headerStyle: {
                        backgroundColor: '#f9fafd',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <FontAwesome.Button
                                name="angle-left"
                                size={25}
                                backgroundColor="#f9fafd"
                                color="#333"
                                onPress={() => navigation.navigate('Login')}
                            />
                        </View>
                    ),
                })}
            />
        </AuthStack.Navigator>
    )
}

const Screens = () => {
    return (
        <Stack.Navigator initialRouteName="MainTab">
            <Stack.Screen
                name="MainTab"
                component={MainTabScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={({navigation}) => ({
                    title: 'Settings and Privacy',
                    headerStyle: {
                        backgroundColor: '#fff',
                        shadowColor: '#f9fafd',
                        elevation: 0,
                    },
                    headerLeft: () => (
                        <View style={{marginLeft: 10}}>
                            <FontAwesome.Button
                                name="angle-left"
                                size={25}
                                backgroundColor="#fff"
                                color="#333"
                                onPress={() => navigation.navigate('Profile')}
                            />
                        </View>
                    ),
                })}
            />
        </Stack.Navigator>
    )
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        if (firebase.auth().currentUser) {
            setIsAuthenticated(true);
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <Screens /> : <AuthScreens />}
        </NavigationContainer>
    );
}

export default App;