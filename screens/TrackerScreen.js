import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import {Colors, IconButton} from "react-native-paper";
import Activity from "../components/Activity";
import firebase from "../api/Firebase";

const TrackerScreen = ({navigation}) => {
    const [activities, setActivities] = useState([]);

    const activityRef = firebase.firestore().collection('activities')

    const getActivity = () => {
        activityRef
            .where('userId', 'in', [firebase.auth().currentUser.uid.toString(), 'default'])
            .onSnapshot((snapshot) => {
                const activity = [];
                snapshot.forEach((doc) => {
                    activity.push({id: doc.id, ...doc.data()})
                })
                setActivities(activity.sort(compare))
            })
    }

    const compare = (a, b) => {
        if (a.userId === 'default' && b.userId !== 'default'){
            return -1;
        }
        if (a.userId !== 'default' && b.userId === 'default'){
            return 1;
        }
        else {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name){
                return 1;
            }
            return 0
        }
    }

    useEffect(() => {
        getActivity();
    }, []);

    const renderActivity = ({item}) => (
        <Activity activity={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="plus"
                color={Colors.grey600}
                size={30}
                onPress={() => navigation.navigate('AddActivity', {activities: activities})}
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