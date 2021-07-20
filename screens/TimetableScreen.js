import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Alert} from "react-native";
import {Agenda} from "react-native-calendars";
import {Card} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddEvent from "../components/planner/AddEvent";
import firebase from "../api/Firebase";

const TimetableScreen = () => {
    const [items, setItems] = useState(
        {
            '2021-07-23': [
                {startTime: '10:00 AM', endTime: '11:00 AM', name: 'Go for a jog'},
                {startTime: '2:00 PM', endTime: '3:00 PM', name: 'Vaccination', description: 'At Tampines Hub'}
            ],
            '2021-07-24': [{startTime: '2:00 PM', endTime: '4:00 PM', name: 'Project meeting', description: 'On Zoom'}],
            '2021-07-25': [{startTime: '6:00 PM', endTime: '8:00 PM', name: 'Dinner', description: 'At Orchard'}]
        })

    const [visible, setVisible] = useState(false)

    const eventRef = firebase.firestore().collection('events')

    const closeModal = () => {
        setVisible(!visible)
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
/*                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }*/
                }
            }
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems)
        }, 1000);
    }

/*    const loadItems = () => {
        setTimeout(() => {
            eventRef
                .where('userId', '==', firebase.auth().currentUser.uid.toString())
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        if (!items[doc.date]) {
                            items[doc.date] = [];
                        }
                        items[doc.date].push({
                            startTime: doc.startTime,
                            endTime: doc.endTime,
                            name: doc.name,
                            description: doc.description
                        })
                    })
                })
            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems)
        }, 1000);
    }*/

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                <Card>
                    <Card.Content style={styles.itemCard}>
                        <View>
                            <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.iconStyle}
                            onPress={() => Alert.alert('Alert!','Are you sure you want to delete the event?',
                                [
                                    {text: 'Yes', onPress: () => {}},
                                    {text: 'No'}
                                ])
                            }
                        >
                            <AntDesign
                                name="delete"
                                size={28}
                                color="#000000"
                            />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Card>
                    <Card.Content>
                        <View style={{height: 50}}>
                            <Text> </Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType='slide'
                visible={visible}
                onRequestClose={() => closeModal()}
            >
                <AddEvent
                    closeModal={() => closeModal()}
                />
            </Modal>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={new Date()}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
                showClosingKnob={true}
            />
            <TouchableOpacity
                style={styles.addEventButton}
                onPress={() => closeModal()}
            >
                <AntDesign
                    name="plus"
                    size={35}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

export default TimetableScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    item: {
        borderRadius: 5,
        marginRight: 10,
        marginTop: 15
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    emptyDate: {
        borderRadius: 5,
        marginRight: 10,
        marginTop: 15,
    },
    addEventButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 50,
        backgroundColor: '#051d5f',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    time: {
        fontSize: 12,
        fontWeight: '600',
        color: 'black',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        marginTop: 5
    },
    description: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey',
        marginTop: 5
    },
    iconStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});