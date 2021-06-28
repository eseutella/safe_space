import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";

import Icon from 'react-native-vector-icons/Ionicons'
import Ionicons from "react-native-vector-icons/Ionicons";
import PostCard from '../components/PostCard';

import {Container
} from '../styles/FeedStyles';
import {Colors, IconButton} from "react-native-paper";

const Posts = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../assets/users/estella.jpg'),
        postTime: '4 mins ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/nus.png'),
        liked: true,
        likes: '14',
        comments: '5',
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: require('../assets/users/estella.jpg'),
        postTime: '2 hours ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '8',
        comments: '0',
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: require('../assets/users/estella.jpg'),
        postTime: '1 hours ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/nus.png'),
        liked: true,
        likes: '1',
        comments: '0',
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: require('../assets/users/zhiaowei.jpg'),
        postTime: '1 day ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/nus.png'),
        liked: true,
        likes: '22',
        comments: '4',
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: require('../assets/users/zhiaowei.jpg'),
        postTime: '2 days ago',
        post:
            'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '0',
        comments: '0',
    },
];

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <IconButton
                icon="plus"
                color={Colors.grey600}
                size={30}
                onPress={() => navigation.navigate('AddPost')}
                style={styles.iconStyle}
            />

            <Container>
                <FlatList
                    data={Posts}
                    renderItem={({item})=><PostCard item={item} />}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    iconStyle: {
        position: 'absolute',
        right: 1,
        top: 1,
    }
});