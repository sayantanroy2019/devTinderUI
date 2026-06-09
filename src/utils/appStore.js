import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userFeedReducer from './userFeedSlice';
import userConnectionsReducer from './userConnectionsSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        userFeed: userFeedReducer,
        userConnectionsSlice: userConnectionsReducer
    },
});

export default appStore;