import { useReducer } from "react";
import { NotificationType } from "../utils/types";

const initialNotification: NotificationType = {
  severity: "error",
  message: "",
};

type Action = {
  type: string;
  notice: NotificationType;
};

const reducer = (state: NotificationType, action: Action) => {
  switch (action.type) {
    case "create":
      return {
        ...state,
        severity: action.notice.severity,
        message: action.notice.message,
      };
    case "remove":
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export const useNoticeReducer = () => {
  const [notification, dispatch] = useReducer(reducer, initialNotification);

  return { notification, dispatch };
};

export const defaultNoticeReducer: ReturnType<typeof useNoticeReducer> = {
  notification: initialNotification,
  dispatch: (() => {}) as React.Dispatch<Action>,
};
