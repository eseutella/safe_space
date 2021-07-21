import React, {useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {Colors, IconButton} from "react-native-paper";
import Activity from "../components/Activity";

const TrackerScreen = ({navigation}) => {
    const [activities, setActivities] = useState([
        {id: 1, name: 'Exercise', color: "#D85963"},
        {id: 2, name: 'Meditation', color: "#D159D8"},
        {id: 3, name: 'Social', color: "#8022D9"},
        {id: 4, name: 'Self-care', color: "#595BD9"},
        {id: 5, name: 'Sleep', color: "#24A6D9"},
        {id: 6, name: 'Mood', color: "#5CD859"},
    ]);

    const renderActivity = ({item}) => (
        <Activity activity={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="plus"
                color={Colors.grey600}
                size={30}
                onPress={() => navigation.navigate('AddActivity', {activities})}
                style={styles.iconStyle}
            />
            <View style={{marginTop: 30}}>
                <FlatList
                    data={activities}
                    renderItem={renderActivity}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

export default TrackerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    iconStyle: {
        position: 'absolute',
        right: 5,
        top: 25,
    }
});