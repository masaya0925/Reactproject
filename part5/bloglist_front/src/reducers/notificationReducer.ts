import {
  AnyAction,
  ThunkAction,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../components/Notification";

type NotificationType = {
  severity: string;
  message: string;
};

const initialState = {
  severity: "success",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(
      state,
      action: PayloadAction<{ severity: string; message: string }>
    ) {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    clearNotification(state) {
      state.message = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotifications = (
  notification: NotificationType
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
