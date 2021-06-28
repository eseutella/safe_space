import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TodoScreen from "./TodoScreen";
import TimetableScreen from "./TimetableScreen";

const Tab = createMaterialTopTabNavigator();

const PlannerScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="Todo"
            keyboardDismissMode="on-drag"
            tabBarOptions={{
                activeTintColor: '#051d5f',
                indicatorStyle: '#051d5f',
                labelStyle: { fontSize: 14 },
                style: {
                    backgroundColor: '#fff',
                    marginTop: insets.top
                },
            }}
        >
            <Tab.Screen
                name="Todo"
                component={TodoScreen}
                options={{ tabBarLabel: 'To-do List' }}
            />
            <Tab.Screen
                name="Timetable"
                component={TimetableScreen}
                options={{ tabBarLabel: 'Timetable' }}
            />
        </Tab.Navigator>
    );
}

export default PlannerScreen;