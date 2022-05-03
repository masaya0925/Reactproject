export interface patientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export interface diagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export type ssnLessPatientsEntry = Omit<patientsEntry, 'ssn'>;

export type NewPatientEntry = Omit<patientsEntry, 'id'>;