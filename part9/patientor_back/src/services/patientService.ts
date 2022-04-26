import { patients } from '../../data/patients';
import { diagnoses } from '../../data/diagnoses';

import { patientsEntry, diagnosesEntry , ssnLessPatientsEntry} from '../types';

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