import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux'
import { TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ROUTES} from "./routes";
import MainScreen from "../screens/MainScreen";
import TasksScreen from "../screens/TasksScreen";
import {resetState} from "../store/app";
import styles from "../screens/styles";

const MainStack = createNativeStackNavigator();
const MainStackNavigation = () => {
    const dispatch = useDispatch();
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
                        <TouchableOpacity onPress={() => dispatch(resetState())} style={{marginRight: 15}}>
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
                        <TouchableOpacity onPress={() => dispatch(resetState())} style={{marginRight: 15}}>
                            <Icon name="logout" size={28} color="#000"/>
                        </TouchableOpacity>
                    ),
                })}
            />
        </MainStack.Navigator>
    )
};

export default MainStackNavigation;

