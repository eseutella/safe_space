import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard, Alert
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import firebase from "../../api/Firebase";

const TodoTask = ({list, closeModal}) => {
    const [data, setData] = useState({
        newTask: "",
        clearInput: false
    });

    const completedCount = list.tasks.filter(task => task.completed).length;
    const taskCount = list.tasks.length

    const listRef = firebase.firestore().collection('lists').doc(list.id)

    const toggleTaskCompleted = (index) => {
        list.tasks[index].completed = !list.tasks[index].completed;
        listRef.update({tasks: list.tasks})
    }

    const addTask = () => {
        if (data.newTask === '') {
            Alert.alert('Error!', 'Please input task name', [
                {text: 'Okay'}
            ]);
        } else if (list.tasks.length > 0 && list.tasks.some(task => task.title === data.newTask)) {
            Alert.alert('Error!', 'Task already exists',
                [{text: 'Okay'}]
            )
        } else {
            list.tasks.push({title: data.newTask, completed: false})

            listRef.update({tasks: list.tasks})

            setData({...data, newTask: ""})

            Keyboard.dismiss()
        }
    };

    const deleteTask = (index) => {
        list.tasks.splice(index, 1);
        listRef.update({tasks: list.tasks})
    }

    const renderTodo = (task, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => toggleTaskCompleted(index)}>
                    <Feather
                        name={task.completed ? "check-square" : "square"}
                        size={24}
                        color='#808080'
                        style={{width: 32}}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.task,
                        {
                            textDecorationLine: task.completed ? "line-through" : "none",
                            color: task.completed ? '#808080' : '#000000'
                        }
                    ]}
                >
                    {task.title}
                </Text>
                <TouchableOpacity
                    style={{position: 'absolute', right: 5}}
                    onPress={() => deleteTask(index)}
                >
                    <Entypo
                        name='cross'
                        size={24}
                        color='#800000'
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <AntDesign
                        name="close"
                        size={24}
                        color="#000000"
                    />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks completed
                        </Text>
                    </View>
                </View>
                <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
                    <FlatList
                        data={list.tasks}
                        renderItem={({item, index}) => renderTodo(item, index)}
                        keyExtractor={item => item.title}
                        contentContainerStyle={{paddingHorizontal: 32}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View
                    style={[styles.section, styles.footer]}
                >
                    <TextInput
                        style={[styles.input, {borderColor: list.color}]}
                        placeholder="Task name"
                        placeholderTextColor="#666"
                        onChangeText={(text) => setData({...data, newTask: text})}
                        value={!data.clearInput ? data.newTask : null}
                        onSubmitEditing={() => setData({...data, clearInput: !data.clearInput})}
                    />
                    <TouchableOpacity
                        style={[styles.addTask, {backgroundColor: list.color}]}
                        onPress={() => addTask()}
                    >
                        <AntDesign
                            name="plus"
                            size={16}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default TodoTask;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    closeButton: {
        position: 'absolute',
        top: 64,
        right: 32,
        zIndex: 10
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 50,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#000000'
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        fontWeight: '600',
        color: '#808080'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex:1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTask: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    task: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16
    }
});