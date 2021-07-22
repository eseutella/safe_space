import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput, SafeAreaView, Alert} from "react-native";
import {colors} from "react-native-elements";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from "../api/Firebase";

const EditProfileScreen = ({navigation}) => {

    const user = firebase.auth().currentUser;
    const[userData, setUserData] = useState(null);

    const getUser = async() => {
        await firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    setUserData(documentSnapshot.data());
                }
    })
    }

    const handleUpUpdate = async() => {
        await firebase.firestore()
            .collection("users")
            .doc(user.uid)
            .update({
                username: userData.username,
                aboutMe: userData.aboutMe,
                phone: userData.phone
            })
            .then(() => {
                console.log('User Updated!');
                Alert.alert(
                   'Profile Updated!',
                   'Your profile has been updated successfully.'
                )
            })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        </View>
                        <ImageBackground
                            source={require('../assets/users/default.jpeg')}
                            style={{height: 150, width: 150}}
                            imageStyle={{borderRadius: 15}}>
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}}>
                        {userData ? userData.username : ''}
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color = {colors.text} size={20} />
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#666666"
                            value={userData ? userData.username : ''}
                            onChangeText={(txt) => setUserData({...userData, username: txt})}
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="info-circle" color = {colors.text} size={20} />
                        <TextInput
                            placeholder="About me"
                            placeholderTextColor="#666666"
                            value={userData ? userData.aboutMe : ''}
                            onChangeText={(txt) => setUserData({...userData, aboutMe: txt})}
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="phone" color = {colors.text} size={20} />
                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#666666"
                            value={userData ? userData.phone : ''}
                            onChangeText={(txt) => setUserData({...userData, phone: txt})}
                            keyboardType="number-pad"
                            autoCorrect={false}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity style={styles.commandButton} onPress={() => {handleUpUpdate()}}>
                        <Text style={styles.panelButtonTitle}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
)};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 30,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginLeft: 50,
        marginTop: 30,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
});