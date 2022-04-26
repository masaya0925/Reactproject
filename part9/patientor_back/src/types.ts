export interface patientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export interface diagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export type ssnLessPatientsEntry = Omit<patientsEntry, 'ssn'>;