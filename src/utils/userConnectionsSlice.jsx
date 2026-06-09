import { createSlice } from '@reduxjs/toolkit';

const userConnectionsSlice = createSlice({
  name: 'userConnections',
  initialState: [],
  reducers: {
     addConnection: (_, action) => action.payload,
     removeConnection: () => [],
  },
});

export const { addConnection, removeConnection } = userConnectionsSlice.actions;
export default userConnectionsSlice.reducer;