"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.getSslLessPatientsEntries = exports.getDiagnose = exports.getPatient = void 0;
const patients_1 = require("../../data/patients");
const diagnoses_1 = require("../../data/diagnoses");
const uuid_1 = require("uuid");
const patients = patients_1.patientsEntries;
const getPatient = () => {
    return patients;
};
exports.getPatient = getPatient;
const getDiagnose = () => {
    return diagnoses_1.diagnoses;
};
exports.getDiagnose = getDiagnose;
const getSslLessPatientsEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.getSslLessPatientsEntries = getSslLessPatientsEntries;
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
exports.addPatient = addPatient;
