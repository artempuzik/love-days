import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TaskComponent = ({ task }) => {
    const date = useMemo(() => new Date().toJSON().split('T')[0], [task])
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{task.description}</Text>
            <Text style={styles.text}>Date: {date}</Text>
            <Text style={styles.text}>Points: {task.points}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderColor: '#40c9e7',
        backgroundColor: '#a0e7f6',
        borderRadius: 15,
        borderWidth: 1,
        marginVertical: 15,
    },
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000',
        marginVertical: 5,
    },
});

export default TaskComponent;
