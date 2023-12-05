import { useReducer } from "react";
import { UserType } from "../utils/types";

const initialState: UserType = {
  username: "",
  name: "",
  blogs: [],
};

type Action = {
  type: string;
  user: UserType;
};

const reducer = (state: UserType, action: Action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.user.username,
        name: action.user.name,
        blogs: action.user.blogs,
      };
    case "logout":
      return {
        ...state,
        username: "",
        name: "",
        blogs: [],
      };
    default:
      return state;
  }
};

export const useLoginReducer = () => {
  const [user, dispatch] = useReducer(reducer, initialState);

  return { user, dispatch };
};

export const defaultLoginReducer: ReturnType<typeof useLoginReducer> = {
  user: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>,
};
