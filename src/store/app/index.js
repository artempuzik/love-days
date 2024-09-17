import { createSlice } from '@reduxjs/toolkit';
import {activities} from "../../config";

const initialState = {
    tasks: activities,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
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
        },
    },
});

export const {
    updateTask,
    setTasks,
    resetState,
} = appSlice.actions;

export default appSlice.reducer;
