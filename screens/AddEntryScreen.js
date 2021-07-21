import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from "react-native";
import firebase from "../api/Firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const AddEntryScreen = ({navigation, route}) => {
    const [data, setData] = useState({
        date: '',
        formattedDate: '',
        description: '',
        clearInput: false
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const activities = route.params.activities;

    const activityRef = firebase.firestore().collection('activities').doc(activities.id)

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setData({
            ...data,
            date: moment(date).format().split('T')[0],
            formattedDate: moment(date).format('MMMM Do YYYY')
        })
        hideDatePicker();
    };

    const createEntry = () => {
        if (data.date === '') {
            Alert.alert('Error!', 'Please input date', [
                {text: 'Okay'}
            ]);
        } else {
            activities.entries.push({
                date: data.date,
                description: data.description,
                userId: firebase.auth().currentUser.uid
            })

            activityRef.update({entries: activities.entries.sort(compare)})

            Alert.alert('Success!', 'Entry successfully added.',
                [
                    {text: 'Okay', onPress: () => navigation.navigate('Entries')},
                    {text: 'Add new entry'}
                ]
            )

            setData({...data, date: '', description: ''})
            }
        }

    const compare = (a, b) => {
        if (a.date < b.date){
            return -1;
        }
        if (a.date > b.date){
            return 1;
        }
        else {
            if (a.description < b.description){
                return -1;
            }
            if (a.description > b.description){
                return 1;
            }
            return 0;
        }
    }


    return (
        <View style={styles.container}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={'date'}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display={'default'}
            />

            <View style={styles.textInput}>
                <Text style={styles.textInputTitle}>Date: </Text>
                <TouchableOpacity style={styles.textInputContent} onPress={setDatePickerVisibility(true)}>
                    <Text style={styles.textInputContent}>{data.formattedDate}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textInput}>
                <Text style={styles.textInputTitle}>Description: </Text>
                <TextInput
                    style={styles.textInputContent}
                    onChangeText={(text) => setData({...data, description: text})}
                    value={!data.clearInput ? data.description : null}
                    onSubmitEditing={() => setData({...data, clearInput: !data.clearInput})}
                />
            </View>
            <TouchableOpacity
                style={[styles.createButton, {backgroundColor: activities.color}]}
                onPress={() => createEntry()}
            >
                <Text style={{color: '#fff', fontWeight: '600'}}>Create</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddEntryScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
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