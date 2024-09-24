import React, {useCallback, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux'
import {Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {ROUTES} from "./routes";
import MainScreen from "../screens/MainScreen";
import TasksScreen from "../screens/TasksScreen";
import {resetState, init} from "../store/app";
import styles from "../screens/styles";
import ArticlesScreen from "../screens/ArticlesScreen";
import ArticleScreen from "../screens/ArticleScreen";
import AppWebView from "../screens/AppWebView";
import StartScreen from "../screens/StartScreen";

const MainStack = createNativeStackNavigator();
const MainStackNavigation = ({ navigation }) => {
    const dispatch = useDispatch();
    const isSuccess = useSelector(state => state.app.isSuccess)

    const requestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (!messaging().isDeviceRegisteredForRemoteMessages) {
                await messaging().registerDeviceForRemoteMessages();
            }

            if (enabled) {
                console.log('Authorization status:', authStatus);
                const apnsToken = await messaging().getAPNSToken();
                console.log('FCM Registration APNs Token:', apnsToken);
                const token = await messaging().getToken();
                console.log('FCM Registration Token:', token);
            }
        } catch (e) {
            console.error('Permission error:', e);
        }
    };

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;

        requestUserPermission().then(() => {
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                Alert.alert('A new FCM message arrived!');
                console.log('Message handled in the background:', remoteMessage);
            });

            unsubscribe = messaging().onMessage(async (remoteMessage) => {
                console.log('Foreground message received:', JSON.stringify(remoteMessage));
            });
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const logout = useCallback((navigation) => {
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
                        dispatch(resetState())
                        navigation.navigate(ROUTES.START)
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

    useEffect(() => {
        dispatch(init())
    }, []);

    if(isSuccess) {
        return (
            <MainStack.Navigator
                initialRouteName={ROUTES.WEB}
                screenOptions={{
                    backgroundColor: '#fff',
                    headerShown: false,
                    animation: 'slide_from_right',
                    gestureEnabled: true,
                    title: '',
                }}
            >
                <MainStack.Screen
                    component={AppWebView}
                    name={ROUTES.WEB}
                />
            </MainStack.Navigator>
        )
    }

    return (
        <MainStack.Navigator
            initialRouteName={ROUTES.START}
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_right',
                gestureEnabled: true,
                headerStyle: styles.header,
                title: '',
            }}
        >
            <MainStack.Screen
                component={StartScreen}
                name={ROUTES.START}
            />
            <MainStack.Screen
                component={MainScreen}
                name={ROUTES.MAIN}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity onPress={() => logout(navigation)} style={{marginRight: 15}}>
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
                        <TouchableOpacity onPress={() => logout(navigation)} style={{marginRight: 15}}>
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
                        <TouchableOpacity onPress={() => logout(navigation)} style={{marginRight: 15}}>
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
                        <TouchableOpacity onPress={() => logout(navigation)} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
        </MainStack.Navigator>
    )
};

export default MainStackNavigation;

