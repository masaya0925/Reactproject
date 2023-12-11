import axios from "axios";
import { UserType } from "../utils/types";

const baseUrl = "/api/users";

export const getAllUser = async () => {
  const response = await axios.get<UserType[]>(baseUrl);

  return response.data;
};
