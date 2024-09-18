import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux'
import {Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {ROUTES} from "./routes";
import MainScreen from "../screens/MainScreen";
import TasksScreen from "../screens/TasksScreen";
import {resetState} from "../store/app";
import styles from "../screens/styles";
import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleScreen from "../screens/ArticleScreen";

const MainStack = createNativeStackNavigator();
const MainStackNavigation = ({ navigation }) => {
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel', // The cancel button is styled differently
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        navigation.navigate(ROUTES.MAIN)
                        dispatch(resetState())
                        Toast.show({
                            type: 'info',
                            text1: 'Your achievements have been reset.',
                        });
                    },
                    style: 'destructive', // The "destructive" style indicates a critical action
                },
            ],
            { cancelable: true } // Allow the alert to be dismissed by tapping outside
        );
    }, []);
    return (
        <MainStack.Navigator
            initialRouteName={ROUTES.MAIN}
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_right',
                gestureEnabled: true,
                headerStyle: styles.header,
                title: '',
            }}
        >
            <MainStack.Screen
                component={MainScreen}
                name={ROUTES.MAIN}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={logout} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
            <MainStack.Screen
                component={TasksScreen}
                name={ROUTES.TASKS}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={logout} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
            <MainStack.Screen
                component={ArticlesScreen}
                name={ROUTES.ARTICLES}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={logout} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
            <MainStack.Screen
                component={ArticleScreen}
                name={ROUTES.ARTICLE}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={logout} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
        </MainStack.Navigator>
    )
};

export default MainStackNavigation;

