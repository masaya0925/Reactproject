import React from "react";
import { useSelector } from "react-redux";

import { Alert } from "@mui/material";

export type RootState = {
  notification: {
    severity: "success" | "error";
    message: string;
  };
};

export const Notification = () => {
  const { severity, message } = useSelector(
    (state: RootState) => state.notification
  );

  if (message === "") {
    return <></>;
  } else {
    return <Alert severity={severity}>{message}</Alert>;
  }
};
