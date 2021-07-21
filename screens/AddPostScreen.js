import React, {useState, useContext} from 'react';
import {
    View,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Alert, Text, ActivityIndicator, KeyboardAvoidingView,
} from 'react-native';
import {InputField,
    InputWrapper,
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper
} from "../styles/AddPost";
import firebase from '../api/Firebase';
import 'firebase/firestore';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
    >
        {children}
    </TouchableWithoutFeedback>
);

const AddPostScreen = ({navigation}) => {
    const user = firebase.auth().currentUser
    const [post, setPost] = useState(null);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);

    const submitPost = async () => {

        if (post == null) {
            console.log('Post is empty!!');
            Alert.alert(
                'Post cannot be published!',
                'Your post cannot be empty!',
            );
        } else {
            firebase.firestore()
                .collection('posts')
                .add({
                    userId: user.uid,
                    post: post,
                    postImg: null,
                    postTime: firebase.firestore.Timestamp.fromDate(new Date()),
                    likes: [],
                    comments: [],
                })
                .then(() => {
                    console.log('Post Added!');
                    Alert.alert(
                        'Post published!',
                        'Your post has been published Successfully!',
                    );
                    setPost(null);
                    setUploading(true);
                    setTransferred(0);
                    navigation.navigate('MainTab')
                })
                .catch((error) => {
                    console.log('Something went wrong with added post to firestore.', error);
                });
        }
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container}>
                <InputWrapper>
                    <InputField
                        placeholder="What's on your mind?"
                        multiline
                        numberOfLines={4}
                        value={post}
                        onChangeText={(content) => setPost(content)}
                    />
                    {uploading ? (
                        <StatusWrapper>
                            <Text>{transferred} % Completed!</Text>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </StatusWrapper>
                    ) : (
                        <SubmitBtn onPress={submitPost}>
                            <SubmitBtnText>Post</SubmitBtnText>
                        </SubmitBtn>
                    )}
                </InputWrapper>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    );
};


export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});