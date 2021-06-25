import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import TempData from "./TempData";
import TodoList from "../components/planner/TodoList";
import AddList from "../components/planner/AddList";

const TodoScreen = () => {
    const [data, setData] = useState({
        taskVisible: false,
        lists: TempData
    });

    const closeModal = () => {
        setData({...data, taskVisible: !data.taskVisible})
    }

    const renderList = (list, index) => {
        return <TodoList list={list} updateList={() => updateList()} deleteList={() => deleteList(index)}/>
    }

    const addList = (list) => {
        setData({
            ...data,
            lists: data.lists.map(item => {
                return item
            })
            //lists: [...data.lists, {...list, id: data.lists.length + 1, todos: []}]
        })
    }

    const updateList = (list) => {
        setData({
            ...data,
            lists: data.lists.map(item => {
                return item
                //return item.id === list.id ? list : item
            })
        })
    }

    const deleteList = (index) => {
        data.lists.splice(index, 1);
        updateList(data.lists);
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={data.taskVisible}
                onRequestClose={() => setData({...data, taskVisible: !data.taskVisible})}
            >
                <AddList
                    closeModal={() => closeModal()}
                    addList={() => addList()}
                    list={data.lists}
                />
            </Modal>
            <Image
                source={require('../assets/safe-space-icon.png')}
                style={styles.logo}
            />
            <TouchableOpacity
                style={styles.addList}
                onPress={() => setData({...data, taskVisible: !data.taskVisible})}
            >
                <AntDesign
                    name="plus"
                    size={20}
                    color='#2e64e5'
                />
                <Text style={{color: 'darkblue'}}>  Add new</Text>
            </TouchableOpacity>
            <View style={{height: 275, paddingLeft:32}}>
                <FlatList
                    data={data.lists}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => renderList(item, index)}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 170,
        width: 170,
        resizeMode: 'cover',
    },
    addList: {
        borderWidth: 2,
        borderColor: '#2e64e5',
        borderRadius: 30,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30
    }
});