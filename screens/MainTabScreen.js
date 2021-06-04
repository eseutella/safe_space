import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "./HomeScreen";
import PlannerScreen from "./PlannerScreen";
import TrackerScreen from "./TrackerScreen";
import MusicScreen from "./MusicScreen";
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
                name="Planner"
                component={PlannerScreen}
                options={{
                    tabBarLabel: 'Planner',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="notebook" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tracker"
                component={TrackerScreen}
                options={{
                    tabBarLabel: 'Tracker',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Music"
                component={MusicScreen}
                options={{
                    tabBarLabel: 'Music',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="music" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={({navigation}) => ({
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                })}
            />
        </Tab.Navigator>
    );
}

export default MainTabScreen;