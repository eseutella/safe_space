import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import * as Animatable from "react-native-animatable";

const AddEvent = ({closeModal}) => {
    const [data, setData] = useState({
        date: '',
        startTime: '',
        unformattedStartTime: '',
        endTime: '',
        eventName: '',
        eventDescription: '',
        isValidEndTime: true
    })
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('date');
    const [startTime, setStartTime] = useState('true')

    const showMode = (currentMode) => {
        setDatePickerVisibility(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showStartTimePicker = () => {
        showMode('time');
        setStartTime('true')
    };

    const showEndTimePicker = () => {
        showMode('time');
        setStartTime('false')
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if (mode === 'date') {
            setData({
                ...data,
                date: moment(date).format('MMMM Do YYYY')
            })
        } else {
            if (startTime === 'true') {
                setData({
                    ...data,
                    startTime: moment(date).format('LT'),
                    unformattedStartTime: date
                })
            } else {
                if (date > data.unformattedStartTime) {
                    setData({
                        ...data,
                        endTime: moment(date).format('LT'),
                        isValidEndTime: true
                    })
                } else {
                    setData({
                        ...data,
                        endTime: moment(date).format('LT'),
                        isValidEndTime: false
                    })
                }
            }
        }
        hideDatePicker();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign
                    name="close"
                    size={24}
                    color="#000000"
                />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display={'default'}
            />

            <View style={{alignSelf: 'stretch', marginHorizontal: 20}}>
                <Text style={styles.title}>Create New Event</Text>
                <View style={styles.textInput}>
                    <Text style={styles.textInputTitle}>Event: </Text>
                    <TextInput
                        style={styles.textInputContent}
                        onChangeText={(text) => setData({...data, eventName: text})}
                    />
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.textInputTitle}>Date: </Text>
                    <TouchableOpacity style={styles.textInputContent} onPress={showDatePicker}>
                        <Text style={styles.textInputContent}>{data.date}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.textInput}>
                    <Text style={styles.textInputTitle}>Start Time: </Text>
                    <TouchableOpacity style={styles.textInputContent} onPress={showStartTimePicker}>
                        <Text style={styles.textInputContent}>{data.startTime}</Text>
                    </TouchableOpacity>

                    <Text style={[styles.textInputTitle, {marginLeft: 5}]}>End Time: </Text>
                    <TouchableOpacity style={styles.textInputContent} onPress={showEndTimePicker}>
                        <Text style={styles.textInputContent}>{data.endTime}</Text>
                    </TouchableOpacity>
                </View>

                { data.isValidEndTime ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>End time must be after start time.</Text>
                    </Animatable.View>
                }

                <View style={styles.textInput}>
                    <Text style={styles.textInputTitle}>Description: </Text>
                    <TextInput
                        style={styles.textInputContent}
                        onChangeText={(text) => setData({...data, eventDescription: text})}
                    />
                </View>
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => {}}
                >
                    <Text style={{color: '#fff', fontWeight: '600'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddEvent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 64,
        right: 32
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: 'black',
        alignSelf: 'center',
        marginBottom: 24
    },
    createButton: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#051d5f'
    },
    textInput: {
        flexDirection: 'row',
        height: 25,
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
        fontSize: 16,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginBottom: 20
    },
})