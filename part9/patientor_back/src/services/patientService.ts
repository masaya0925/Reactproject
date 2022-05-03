import { patientsEntries } from '../../data/patients';
import { diagnoses } from '../../data/diagnoses';
import { v1 as uuid } from 'uuid';
import { patientsEntry, diagnosesEntry , ssnLessPatientsEntry, NewPatientEntry} from '../types';

const patients: Array<patientsEntry> = patientsEntries; 

export const getPatient = (): Array<patientsEntry> => {
    return patients;
};

export const getDiagnose = (): Array<diagnosesEntry> => {
    return diagnoses;
};

export const getSslLessPatientsEntries = (): ssnLessPatientsEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export const addPatient = (entry: NewPatientEntry): patientsEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};