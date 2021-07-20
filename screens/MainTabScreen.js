import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./HomeScreen";
import TodoScreen from "./TodoScreen"
import TimetableScreen from "./TimetableScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#051d5f',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Todo-List"
                component={TodoScreen}
                options={{
                    tabBarLabel: 'Todo-List',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Timetable"
                component={TimetableScreen}
                options={{
                    tabBarLabel: 'Timetable',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabScreen;