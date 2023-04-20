import { createSlice } from "@reduxjs/toolkit";

const initialState = 'notifications here...';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_state, action: {type: string, payload: string}) {
        return action.payload;
    },
    clearNotification() {
        return '';
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;