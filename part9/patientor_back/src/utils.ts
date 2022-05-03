import { Gender, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error(`Incorrect name: ${name}`);   
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date)); 
};

const parseDateOfBirth = (birth: unknown): string => {
    if(!birth || !isString(birth) || !isDate(birth)){
        throw new Error(`Incorrect or missing dateOfBirth: ${birth}`);   
    }
    return birth;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error(`Incorrect ssn:${ssn}`);
    }
    return ssn;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (job: unknown): string => {
    if(!job || !isString(job)){
        throw new Error(`Incorrect Occupation:${job}`);
    }
    return job;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

 export const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newEntry;
};
