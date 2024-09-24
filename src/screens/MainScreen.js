import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./styles";
import Button from "../components/Button";
import {updateTask} from "../store/app";
import {ROUTES} from "../navigation/routes";

const MainScreen = ({navigation}) => {
    const tasks = useSelector(state => state.app.tasks);
    const user = useSelector(state => state.app.user);
    const dispatch = useDispatch();

    // Get the day number of the year
    const today = useMemo(() => {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const diffInMillis = currentDate - startOfYear;
        const millisInDay = 1000 * 60 * 60 * 24;
        return Math.floor(diffInMillis / millisInDay) + 1;
    }, []);

    // Get total points
    const points = useMemo(() => {
        return Object.values(tasks).reduce((acc, task) => {
            if (task.points) {
                acc += task.points;
            }
            return acc;
        }, 0);
    }, [tasks]);

    // Get current task and its description
    const task = useMemo(() => {
        const updated = {...tasks}
        return updated[today]
    }, [tasks, today]);
    const description = useMemo(() => task?.description, [task]);

    // Timer state and reference to store the interval ID
    const [timer, setTimer] = useState(0);
    const intervalId = useRef(null);

    // Start the task and timer
    const startTask = useCallback(() => {
        const start = new Date();
        dispatch(updateTask({key: today, value: {...task, start, status: 1}}));
    }, [dispatch, task, today]);

    // Stop the task and clear the timer
    const stopTask = useCallback(() => {
        const end = new Date();

        // Calculate duration in hours
        const startTime = new Date(task.start);
        const endTime = new Date(end);
        const durationInHours = (endTime - startTime) / (1000 * 60 * 60);

        // Set task points based on the duration
        let points = 0;
        if (durationInHours >= 0 && durationInHours < 10) {
            points = Math.max(10 - Math.floor(durationInHours), 0); // Decrease points by 1 per hour
        }

        dispatch(updateTask({key: today, value: {
            ...task,
            end,
            points
        }})); // Update task with the new points

        // Clear the interval when task is stopped
        clearInterval(intervalId.current);
        intervalId.current = null;
    }, [dispatch, task, intervalId, today]);

    // Continue the timer if the task was already started
    useEffect(() => {
        if (task.start && !task.end) {
            const startTime = new Date(task.start);
            setTimer(Math.floor((new Date() - startTime) / 1000)); // Initialize timer based on the start time

            // Start interval if task is ongoing
            intervalId.current = setInterval(() => {
                setTimer(Math.floor((new Date() - startTime) / 1000));
            }, 1000);
        }

        return () => clearInterval(intervalId.current);
    }, [task, tasks]);

    // Format timer as HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    const goToResult = useCallback(() => {
        navigation.navigate(ROUTES.TASKS)
    }, [])

    const goToArticles = useCallback(() => {
        navigation.navigate(ROUTES.ARTICLES)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Love Days</Text>
            <Text style={styles.subTitle}>{user.me} & {user.partner}</Text>
            <Text style={styles.points}>Total: {points}</Text>
            <Text style={styles.task}>{description}</Text>
            {task.start && !task.end && (
                <Text style={styles.timer}>Time: {formatTime(timer)}</Text>
            )}

            <Button title={'Start task'} disabled={task.start} onPress={startTask} color={'#2dd094'} />
            <Button title={'The task is completed'} disabled={task.end} onPress={stopTask} color={'#7ab5ef'} />
            <Button title={'Result'} onPress={goToResult} />
            <Button title={'Articles'} onPress={goToArticles} />
        </View>
    );
};

export default MainScreen;
