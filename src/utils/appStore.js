import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userFeedReducer from './userFeedSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        userFeed: userFeedReducer,
    },
});

export default appStore;