import { createSlice } from '@reduxjs/toolkit';


const userFeedSlice = createSlice({
    name: 'userFeed',
    initialState: [],
    reducers: {
       addFeed: (_, action) => action.payload,
       removeFeed: () => [],
    },
});

export const { addFeed, removeFeed } = userFeedSlice.actions;
export default userFeedSlice.reducer;