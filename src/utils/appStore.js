import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import userFeedReducer from './userFeedSlice';
import userConnectionsReducer from './userConnectionsSlice';
import userRequestsReducer from './userRequestsSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        userFeed: userFeedReducer,
        userConnectionsSlice: userConnectionsReducer,
        userRequestsSlice: userRequestsReducer
    },
});

export default appStore;