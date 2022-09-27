import bcrypt from 'bcrypt';
import { isString } from 'lodash';

import { NewUser, toNewUserParams } from './types';


const stringParser = (param: unknown, field: string, minlength = 0): string => {
    if(!isString(param)){
        const error = new Error(`Invalid ${field}`);
        error.name = 'ValidationError';
        throw error;
    } else if(param.length < minlength) {
        const error = new Error(`Invalid username or password, Please enter at least ${minlength} characters`);
        error.name = 'ValidationError';
        throw error;
    }
    return param;
};


export const toNewUser = async (params: toNewUserParams): Promise<NewUser> => {
    const username = stringParser(params.username, 'username', 3);
    const name = stringParser(params.name, 'name');
    const password = stringParser(params.password, 'password', 3);

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const blogs: string[] = [];

    const newUser: NewUser = {username, name, passwordHash, blogs};

    return newUser;
};