import { createSlice } from '@reduxjs/toolkit';

const userRequestsSlice = createSlice({
  name: 'userRequests',
  initialState: [],
  reducers: {
     addRequest: (_, action) => action.payload,
     removeRequest: () => [],
  },
});

export const { addRequest, removeRequest } = userRequestsSlice.actions;
export default userRequestsSlice.reducer;