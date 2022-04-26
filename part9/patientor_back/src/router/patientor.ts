import  express  from 'express';

import { getDiagnose, getSslLessPatientsEntries} from '../services/patientService';

const router = express.Router();

router.get('/diagnoses', (_req, res) => {
    res.send(getDiagnose());
});

router.get('/patients', (_req, res) => {
    res.send(getSslLessPatientsEntries());
});

export default router;