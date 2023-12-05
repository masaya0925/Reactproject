import React, { createContext, useContext } from "react";
import { defaultLoginReducer, useLoginReducer } from "./reducers/UserReducer";

type Props = {
  children: React.ReactNode;
};

export const LoginContext = createContext(defaultLoginReducer);

export const useLoginContext = () => useContext(LoginContext);

export const LoginContextProvider = ({ children }: Props) => {
  return (
    <LoginContext.Provider value={useLoginReducer()}>
      {children}
    </LoginContext.Provider>
  );
};
