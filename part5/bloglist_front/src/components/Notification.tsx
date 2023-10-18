import React from "react";
import { useSelector } from "react-redux";

import { Alert } from "@mui/material";
import { RootState } from "../utils/types";

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
