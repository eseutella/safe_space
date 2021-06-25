import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainTabScreen from "./screens/MainTabScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AddPostScreen from "./screens/AddPostScreen";
import HomeScreen from "./screens/HomeScreen";
import {View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="MainTab">
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
                                    onPress={() => navigation.navigate('Profile')}
                                />
                            </View>
                        ),
                    })}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{header: () => null}}
                />
                <Stack.Screen
                    name="AddPost"
                    component={AddPostScreen}
                    options={({navigation}) => ({
                        headerLeft: () => (
                            <View style={{marginLeft: 10}}>
                                <FontAwesome.Button
                                    name="angle-left"
                                    size={25}
                                    backgroundColor="#f9fafd"
                                    color="#333"
                                    onPress={() => navigation.navigate('HomeScreen')}
                                />
                            </View>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;