import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import TodoTask from "./TodoTask";
import firebase from "../../api/Firebase";

const TodoList = ({list}) => {
    const [state, setState] = useState(false);

    const completedCount = list.tasks.filter(task => task.completed).length;
    const remainingCount = list.tasks.length - completedCount;

    const listRef = firebase.firestore().collection('lists').doc(list.id)

    const deleteList = () => {
        listRef.delete()
    }

    return (
        <View>
            <Modal
                animationType='slide'
                visible={state}
                onRequestClose={() => setState(!state)}
            >
                <TodoTask
                    list={list}
                    closeModal={() => setState(!state)}
                />
            </Modal>
            <TouchableOpacity
                style={[styles.listContainer, {backgroundColor: list.color}]}
                onPress={() => setState(!state)}
            >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.status}>Completed</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.status}>Remaining</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() => Alert.alert('Alert!','Are you sure you want to delete the list?',
                        [
                            {text: 'Yes', onPress: () => deleteList()},
                            {text: 'No'}
                        ])
                    }
                >
                    <AntDesign
                        name="delete"
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

export default TodoList;

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200
    },
    listTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: '#fff'
    },
    status: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff'
    },
    iconStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});