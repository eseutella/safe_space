import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, FlatList, SafeAreaView, Alert, RefreshControl, ScrollView, LogBox} from "react-native";

import PostCard from '../components/PostCard';

import {Container} from '../styles/FeedStyles';
import {Colors, IconButton} from "react-native-paper";
import firebase from '../api/Firebase';


const HomeScreen = ({navigation}) => {
    const [posts, setPosts] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const list = [];

            await firebase.firestore()
                .collection('posts')
                .orderBy('postTime', 'desc')
                .get()
                .then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {
                        const {userId, post, postImg, postTime, likes, comments} = doc.data();
                        list.push({
                            id: doc.id,
                            userId,
                            userName: 'Test Name',
                            userImg: require('../assets/users/zhiaowei.jpg'),
                            postTime: postTime,
                            post: post,
                            postImg: postImg,
                            liked: false,
                            likes: likes,
                            comments: comments,
                        });
                    });
                });

            setPosts(list);
            setRefreshing(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        const db = firebase.firestore()
            .collection('posts')
            .doc(postId);
        const userId = firebase.auth().currentUser.uid;

        db.get().then((snapshot) => {
            // list of likes from the firebase
            let likelist = snapshot.get("likes");
            if (!Array.isArray(likelist)) {
                likelist = [];
            }

            // current user who likes the post has already liked it before
            if (likelist.find(id => id === userId)) {
                likelist = likelist.filter(id => id !== userId);  // remove current user from likelist
            } else {
                likelist.push(userId);
            }

            db.update({likes: likelist});
        });
    };


    const handleComment = (postId) => {
        console.log("commented");
    }

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deletePost(postId),
                },
            ],
            {cancelable: false},
        );
    };

    const deletePost = (postId) => {
        console.log('Current Post Id: ', postId);
        firebase.firestore().collection('posts')
                    .doc(postId)
                    .delete()
                    .then(() => {
                        Alert.alert(
                    'Post deleted!',
                    'Your post has been deleted successfully!',
                );
            })
        setDeleted(true);
    }

    return (
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Safe Space</Text>
                <IconButton
                    icon="plus"
                    color={Colors.grey600}
                    size={30}
                    onPress={() => navigation.navigate('AddPost')}
                    style={styles.iconStyle}
                />
            <ScrollView showsVerticalScrollIndicator={false} >
                <Container>
                    <FlatList
                        data={posts}
                        renderItem={({item}) => <PostCard item={item} onDelete={handleDelete}
                                                          onLiked={handleLike}
                                                          onComment={handleComment}
                        />}
                        keyExtractor={item=>item.id}
                    />
                </Container>
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        marginTop: 10,
        color: '#051d5f',
    },
    iconStyle: {
        position: 'absolute',
        right: 5,
        top: 25,
    }
});