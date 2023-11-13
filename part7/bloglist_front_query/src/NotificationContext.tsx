import React, { useContext, createContext, useCallback } from "react";
import {
  useNoticeReducer,
  defaultNoticeReducer,
} from "./reducers/NotificationReducer";
import { NotificationType } from "./utils/types";

const { notification, dispatch } = defaultNoticeReducer;

const NoticeContext = createContext(notification);
const DispatchContext = createContext(dispatch);

type NoticeDispatch = {
  setNotice: (notice: NotificationType) => void;
};

const NoticeDispatchContext = createContext<NoticeDispatch>({
  setNotice: () => void 0,
});

type Props = {
  children: React.ReactNode;
};

export const useNoticeContext = () => useContext(NoticeContext);
export const useContextDispatch = () => useContext(DispatchContext);
export const useNotice = () => useContext(NoticeDispatchContext);

export const NoticeContextProvider = ({ children }: Props) => {
  const { notification, dispatch } = useNoticeReducer();

  const setNotice = useCallback((notice: NotificationType) => {
    dispatch({ type: "create", notice: notice });

    setTimeout(() => {
      dispatch({ type: "remove", notice: notice });
    }, 3000);
  }, []);

  return (
    <NoticeContext.Provider value={notification}>
      <DispatchContext.Provider value={dispatch}>
        <NoticeDispatchContext.Provider value={{ setNotice }}>
          {children}
        </NoticeDispatchContext.Provider>
      </DispatchContext.Provider>
    </NoticeContext.Provider>
  );
};
