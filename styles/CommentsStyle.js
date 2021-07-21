import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 3;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`;

// Grey Background
export const Card = styled.View`
    background-color: #f8f8f8;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 10px; 
    flex: 3
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

// User's Text Information
export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export const PostTime = styled.Text`
    font-size: 12px;
    color: #666;
`;

export const PostText = styled.Text`
    font-size: 14px;
    padding-top: 10px;
    margin-bottom: 5px;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;