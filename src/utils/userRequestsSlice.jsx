import { createSlice } from '@reduxjs/toolkit';

const userRequestsSlice = createSlice({
  name: 'userRequests',
  initialState: [],
  reducers: {
     addRequest: (_, action) => action.payload,
     removeRequest: (state, action) => state.filter((request) => request._id !== action.payload),
  },
});

export const { addRequest, removeRequest } = userRequestsSlice.actions;
export default userRequestsSlice.reducer;