import  express  from 'express';

import { addPatient, getDiagnose, getSslLessPatientsEntries} from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(getDiagnose());
});

router.get('/patients', (_req, res) => {
    res.send(getSslLessPatientsEntries());
});

router.post('/patients', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (e) {
        if(e instanceof Error) {
        res.status(400).send(e.message);
       }
    }
});

export default router;