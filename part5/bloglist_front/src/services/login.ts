import axios from "axios";
import { UserToken } from "../utils/types";

const baseUrl = '/api/login';

type Credential = { username: string, password: string};

export const login = async (credential: Credential) => {
    const response = await axios.post<UserToken>(baseUrl, credential);
    return response.data;
};
