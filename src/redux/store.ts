import { configureStore } from '@reduxjs/toolkit';
import moodReducer from './slices/moodSlice';
import taskReducer from './slices/taskSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        mood: moodReducer,
        tasks: taskReducer,
        theme: themeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
