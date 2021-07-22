import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity} from "react-native";
import firebase from "../api/Firebase";

const ProfileScreen = ({navigation}) => {

    const user = firebase.auth().currentUser;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        getUser();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.userImg}
                    source={require('../assets/users/default.jpeg')}
                />
                <Text style={styles.userName}> {userData ? userData.username : "Test"} </Text>
                <Text style={styles.about}> {userData ? userData.aboutMe || 'No details added.' : ""} </Text>
                <View style={styles.userBtnWrapper}>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {navigation.navigate('EditProfile')}}>
                        <Text style={styles.userBtnTxt}> Edit Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userBtn} onPress={() => {firebase.auth().signOut()}}>
                        <Text style={styles.userBtnTxt}> Log Out </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        marginTop: 100,
        height: 300,
        width: 300,
        borderRadius: 75,
    },
    userName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        marginTop: 20,
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    }
});