import React from "react";
import {
    Card,
    Divider, Interaction, InteractionText,
    InteractionWrapper,
    PostImg,
    PostText,
    PostTime,
    UserImg,
    UserInfo,
    UserInfoText,
    UserName
} from "../styles/FeedStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "../api/Firebase";
import moment from 'moment';

const PostCard = ({item, onDelete, onLiked, onComment}) => {

    let likeIcon, likeIconColor, commentText, likeText;
    likeIcon = item.liked ? 'heart' : 'heart-outline';
    likeIconColor = item.liked ? '#2e64e5' : '#333';
    const user = firebase.auth().currentUser;

    // item is the post object retrieved from database
    const hasLike = item.likes.length >= 1;
    const hasComment = item.comments.length >= 1;

    if (item.likes.length === 0) {
        likeText = 'Like';
    } else {
        likeText = item.likes.length + ' Likes';
    }

    // TODO: do the same for comments

    if (item.comments.length === 0) {
        commentText = 'Comment';
    } else {
        commentText = item.comments.length + ' Comments';
    }

    return(
        <Card>
            <UserInfo>
                <UserImg source={item.userImg} />
                <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={item.postImg} /> : <Divider/>}

            <InteractionWrapper>
                <Interaction onPress={() => onLiked(item.id)} active={hasLike}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={hasLike}>{likeText}</InteractionText>
                </Interaction>
                <Interaction onPress={() => onComment(item.id)} active={hasComment}>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText active={hasLike}>{commentText}</InteractionText>
                </Interaction>
                {firebase.auth().currentUser.uid === item.userId ?
                <Interaction onPress={() => onDelete(item.id)}>
                    <Ionicons name="md-trash-bin" size={25} />
                </Interaction>
                    : null}
            </InteractionWrapper>
        </Card>
    )
}

export default PostCard;