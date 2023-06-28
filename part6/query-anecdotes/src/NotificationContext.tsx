import React, { createContext, useContext, useReducer } from "react";
import { NotificationType } from "./types";

const initialState: NotificationType = {
  type: '',
  message: '',
  isOpen: false
};

type NotificationAction = {
  type: string,
  payload: string
};

const notificationReducer = (state = initialState, action: NotificationAction) => {
    switch(action.type) {
        case 'create':
          return {
            ...state,
            message: action.payload,
            isOpen: true
          };
        case 'remove': 
          return {
            ...state,
            message: action.payload,
            isOpen: false
          }
        default: 
          return state;       
    };
};

type NotificationContextType = {
  state: NotificationType,
  dispatch: React.Dispatch<NotificationAction> 
};

const NotificationContext = createContext<NotificationContextType>({
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<NotificationAction>
});

export const useNotification = () => useContext(NotificationContext);

type Props = {
  children: React.ReactNode
};

export const NotificationContextProvider = (props: Props) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);

    return (
        <NotificationContext.Provider value = {{ state, dispatch }}>
          {props.children}
        </NotificationContext.Provider>
    );
};