import React from "react";
import { useNoticeContext } from "../NotificationContext";
import { Alert } from "@mui/material";

export const Notification = () => {
  const notification = useNoticeContext();

  if (notification.message === "") {
    return <></>;
  } else {
    return (
      <Alert severity={notification.severity}>{notification.message}</Alert>
    );
  }
};
