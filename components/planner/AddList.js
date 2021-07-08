import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import firebase from "../../api/Firebase";

const AddList = ({closeModal, list}) => {
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

    const createTodoList = () => {
        if (data.name === '') {
            Alert.alert('Error!', 'Please input list name', [
                {text: 'Okay'}
            ]);
        } else if (list.length > 0 && list.some(list => list.name === data.name)) {
            Alert.alert('Error!', 'List already exists',
                [{text: 'Okay'}]
            )
        } else {
            firebase.firestore().collection('lists').add({
                userId: firebase.auth().currentUser.uid,
                name: data.name,
                color: data.color,
                tasks: []
            })
                .then(() => {
                    Alert.alert('Success!', 'List successfully added.', [{text: 'Okay'}])
                })

/*            Alert.alert('Success!', 'List successfully added.',
                [
                    {text: 'Okay', onPress: () => closeModal()},
                    {text: 'Add new list'}
                ]
            );*/
            setData({
                ...data,
                name: ''
            });
        }
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
            <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                <Text style={styles.title}>Create To-Do List</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="List name"
                    placeholderTextColor="#666"
                    onChangeText={(text) => setData({...data, name: text})}
                    value={!data.clearInput ? data.name : null}
                    onSubmitEditing={() => setData({...data, clearInput: !data.clearInput})}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>
                    {renderColors()}
                </View>
                <TouchableOpacity
                    style={[styles.createButton, {backgroundColor: data.color}]}
                    onPress={() => createTodoList()}
                >
                    <Text style={{color: '#fff', fontWeight: '600'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddList;

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
        marginBottom: 16
    },
    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#2e64e5',
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    createButton: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectColor: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
});