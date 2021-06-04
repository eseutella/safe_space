import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
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
                                    name="angle-double-left"
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
                    name="Home"
                    component={HomeScreen}
                    options={{header: () => null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;