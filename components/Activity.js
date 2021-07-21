import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import firebase from "../api/Firebase";

const Activity = ({activity, onPress}) => {
    const activityRef = firebase.firestore().collection('activities').doc(activity.id)

    const deleteActivity = () => {
        activityRef.delete()
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.activityContainer, {backgroundColor: activity.color}]}
                onPress={onPress}
            >
                <Text style={styles.activityTitle} numberOfLines={1}>
                    {activity.name}
                </Text>
                {activity.userId === 'default'
                    ? null
                    : <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => Alert.alert('Alert!', 'Are you sure you want to delete the activity?',
                            [
                                {text: 'Yes', onPress: () => deleteActivity()},
                                {text: 'No'}
                            ])
                        }
                    >
                        <AntDesign
                            name="delete"
                            size={28}
                            color="#fff"
                        />
                    </TouchableOpacity>
                }
            </TouchableOpacity>
        </View>
    );
};

export default Activity;

const styles = StyleSheet.create({
    activityContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        marginTop: 8
    },
    activityTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginTop: 8,
        marginBottom: 8
    },
    iconStyle: {
        position: 'absolute',
        right: 10,
        bottom: 10
    }
});