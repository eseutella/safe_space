import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import TodoList from "../components/planner/TodoList";
import AddList from "../components/planner/AddList";
import firebase from "../api/Firebase";

const TodoScreen = () => {
    const [data, setData] = useState({
        taskVisible: false,
        lists: []
    });

    const listRef = firebase.firestore().collection('lists')

    const getList = () => {
        listRef
            .where('userId', '==', firebase.auth().currentUser.uid.toString())
            .onSnapshot((snapshot) => {
                const list = [];
                snapshot.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                })
            setData({...data, lists: list.sort(compare)})
        })
    }

    const compare = (a, b) => {
        if (a.name < b.name){
            return -1;
        }
        if (a.name > b.name){
            return 1;
        }
        return 0;
    }


    useEffect(() => {
        getList();
    }, []);

    const closeModal = () => {
        setData({...data, taskVisible: !data.taskVisible})
    }

    const renderList = (list, index) => {
        return <TodoList list={list}/>
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
            <View style={{height: 275}}>
                {data.lists.length > 0 ?
                    <FlatList
                        data={data.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => renderList(item, index)}
                        keyboardShouldPersistTaps="always"
                    />
                    :
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                        <Text style={styles.text}>Don't have any lists?</Text>
                        <Text style={styles.text}>Create one</Text>
                        <TouchableOpacity
                            onPress={() => setData({...data, taskVisible: !data.taskVisible})}
                        >
                            <Text style={{fontSize: 28, fontWeight: '600', color: 'darkblue'}}> here</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>!</Text>
                    </View>
                }
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
    },
    text: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000000'
    }
});