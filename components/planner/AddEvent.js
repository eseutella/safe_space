import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const AddEvent = ({closeModal}) => {
    const [data, setData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        eventName: '',
        eventDescription: ''
    })
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
                    <TextInput
                        style={styles.textInputContent}
                        onChangeText={(text) => setData({...data, date: text})}
                    />
                    <TouchableOpacity
                        style={{marginLeft: 5}}
                        onPress={() => {}}
                    >
                        <AntDesign
                            name="calendar"
                            size={24}
                            color="#000000"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.textInput}>
                    <Text style={styles.textInputTitle}>Start Time: </Text>
                    <TextInput
                        style={styles.textInputContent}
                        onChangeText={(text) => setData({...data, startTime: text})}
                    />
                    <Text style={[styles.textInputTitle, {marginLeft: 5}]}>End Time: </Text>
                    <TextInput
                        style={styles.textInputContent}
                        onChangeText={(text) => setData({...data, endTime: text})}
                    />
                </View>
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
    }
})