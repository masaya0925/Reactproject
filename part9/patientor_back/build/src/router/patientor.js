"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/diagnoses', (_req, res) => {
    res.send((0, patientService_1.getDiagnose)());
});
router.get('/patients', (_req, res) => {
    res.send((0, patientService_1.getSslLessPatientsEntries)());
});
router.post('/patients', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedPatient = (0, patientService_1.addPatient)(newPatientEntry);
        res.json(addedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});
exports.default = router;
