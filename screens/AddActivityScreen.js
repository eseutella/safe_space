import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import firebase from "../api/Firebase";

const AddActivityScreen = ({navigation, route}) => {
    const backgroundColors = ["#a84b19", "#D88559", "#D85963", "#D159D8", "#8022D9", "#595BD9", "#24A6D9", "#5CD859"]
    const [data, setData] = useState({
        name: '',
        color: backgroundColors[0],
        clearInput: false
    });

    const renderColors = () => {
        return backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.selectColor, {backgroundColor: color}]}
                    onPress={() => setData({...data, color: color})}
                />
            );
        })
    };

    const activities = route.params.activities;

    const createActivity = () => {
        if (data.name === '') {
            Alert.alert('Error!', 'Please input activity name', [
                {text: 'Okay'}
            ]);
        } else if (activities.length > 0 && activities.some(activity => activity.name === data.name)) {
            Alert.alert('Error!', 'Activity already exists',
                [{text: 'Okay'}]
            )
        } else {
            firebase.firestore().collection('activities').add({
                userId: firebase.auth().currentUser.uid,
                name: data.name,
                color: data.color,
                entries: []
            })
                .then(() => {
                    Alert.alert('Success!', 'Activity successfully added.',
                        [
                            {text: 'Okay', onPress: () => navigation.navigate('MainTab')},
                            {text: 'Add new activity'}
                        ]
                    )
                })

            setData({
                ...data,
                name: ''
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <Text style={styles.textInputTitle}>Activity: </Text>
                <TextInput
                    style={styles.textInputContent}
                    onChangeText={(text) => setData({...data, name: text})}
                    value={!data.clearInput ? data.name : null}
                    onSubmitEditing={() => setData({...data, clearInput: !data.clearInput})}
                />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                {renderColors()}
            </View>
            <TouchableOpacity
                style={[styles.createButton, {backgroundColor: data.color}]}
                onPress={() => createActivity()}
            >
                <Text style={{color: '#fff', fontWeight: '600'}}>Create</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddActivityScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'stretch',
        padding: 20,
    },
    textInput: {
        flexDirection: 'row',
        height: 25,
        marginTop: 20,
        marginBottom: 20
    },
    textInputTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black'
    },
    textInputContent: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        fontSize: 18,
    },
    createButton: {
        marginTop: 40,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectColor: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});