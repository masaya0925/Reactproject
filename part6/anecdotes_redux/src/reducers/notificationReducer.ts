import { createSlice } from "@reduxjs/toolkit";

const initialState = 'notifications here...';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action: {type: string, payload: string}) {
        console.log('set:',state);
        return action.payload;
    },
    unSetNotification(state, _action: {type: string, payload: string}){
        console.log('unset: ', state);
        return '';
    }
  }
});

export const { setNotification, unSetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;