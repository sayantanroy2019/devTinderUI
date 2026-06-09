import { createSlice } from '@reduxjs/toolkit';


const userFeedSlice = createSlice({
    name: 'userFeed',
    initialState: [],
    reducers: {
       addFeed: (_, action) => action.payload,
       removeUserFromFeed: (state, action) => state.filter((user) => user._id !== action.payload),
       removeFeed: () => [],
    },
});

export const { addFeed, removeUserFromFeed, removeFeed } = userFeedSlice.actions;
export default userFeedSlice.reducer;