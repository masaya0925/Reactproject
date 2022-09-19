import bcrypt from 'bcrypt';
import { isString } from 'lodash';

import { NewUser, toNewUserParams } from './types';


const stringParser = (param: unknown): string => {
    if(!isString(param)){
        const error = new Error('Invalid Params');
        error.name = 'ValidationError';
        throw error;
    }
    return param;
};


export const toNewUser = async (params: toNewUserParams): Promise<NewUser> => {
    const username = stringParser(params.username);
    const name = stringParser(params.name);
    const password = stringParser(params.password);

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const blogs: string[] = [];

    const newUser: NewUser = {username, name, passwordHash, blogs};

    return newUser;
};