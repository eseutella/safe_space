import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Alert,
    FlatList,
    RefreshControl,
    ScrollView
} from "react-native";
import CommentsCard from '../components/CommentsCard';
import {InputField, InputWrapper, SubmitBtn, SubmitBtnText} from "../styles/AddPost";
import firebase from "../api/Firebase";
import {Container} from "../styles/FeedStyles";
import * as navigation from "react-native";

const CommentScreen = ({route}) => {
    const [comments, setComments] = useState(null); // new comments
    const [eachComment, setEachComment] = useState(null); // set each comment
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true);

    const postId = route.params.post;

    const db = firebase.firestore()
        .collection('posts')
        .doc(postId);
    const userId = firebase.auth().currentUser.uid;

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchComments();
    }, []);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        // need to call handleComment from HomeScreen
        try {

            let list = [];

            await firebase.firestore()
                .collection('posts')
                .doc(postId)
                .get()
                .then((snapshot) => {
                    let comments = snapshot.get("comments");

                    comments.forEach(comment => {
                        list.push({
                            userId : comment.userId,
                            comment : comment.comments,
                            commentedTime : comment.commentedTime
                        })
                    })
                });
            // only change the name here because nested firestore don't work
            for (let comment of list) {
                await firebase.firestore().collection("users").doc(comment.userId).get().then((userDoc) => {
                    comment["userId"] = userDoc.data().username;
                });
            }

            setEachComment(list);
            setRefreshing(false);

        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async () => {
        if (comments == null) {
            console.log('Comment is empty!!');
            Alert.alert(
                'Comment cannot be published!',
                'Your comment cannot be empty!',
            )} else {
                db.get().then((snapshot) => {
                    // list of comments from the firebase
                    let commentsList = snapshot.get("comments");
                    if (!Array.isArray(commentsList)) {
                        commentsList = [];
                    }
                    try {
                        commentsList.push({
                            userId,
                            comments,
                            commentedTime: firebase.firestore.Timestamp.fromDate(new Date())
                        });
                        db.update({comments: commentsList});
                        Alert.alert(
                            'Comment posted!',
                            'Your comment has been posted successfully!',
                        );
                        onRefresh();
                    } catch {
                        Alert.alert(
                            'Failed to post comment!',
                            'Your comment has not been posted successfully!',
                        );
                    }
                })
            }
        }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <InputWrapper>
                    <InputField
                        placeholder="Enter comments here"
                        multiline
                        numberOfLines={4}
                        value={comments}
                        onChangeText={(content) => setComments(content)}
                    />
                    <SubmitBtn onPress={() => {addComment()}} type={"reset"}>
                        <SubmitBtnText>Post</SubmitBtnText>
                    </SubmitBtn>
                </InputWrapper>
                <Container>
                    <FlatList
                        data={eachComment}
                        renderItem={({item}) => <CommentsCard item={item}
                        />}
                        keyExtractor={item=>item.commentedTime.valueOf()}
                    />
                </Container>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CommentScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        height: 100
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});