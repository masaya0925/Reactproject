import { AnyAction, ThunkAction, createSlice } from "@reduxjs/toolkit";

const initialState = "notifications here...";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_state, action: { type: string; payload: string }) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotifications = (
  message: string,
  time: number
): ThunkAction<void, string, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
