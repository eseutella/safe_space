import React from "react";
import {
    Card,
    Divider,
    PostText,
    PostTime,
    UserImg,
    UserInfo,
    UserInfoText,
    UserName
} from "../styles/FeedStyles";

import moment from 'moment';

const CommentsCard = ({item}) => {
    return (
        <Card>
            <UserInfo>
                <UserImg source={require('../assets/users/default.jpeg')} />
                <UserInfoText>
                    <UserName>{item.userId}</UserName>
                    <PostText>{item.comment}</PostText>
                    <PostTime>{moment(item.commentedTime.toDate()).fromNow()}</PostTime>
                </UserInfoText>
            </UserInfo>

            <Divider/>
        </Card>
    )
}

export default CommentsCard;

