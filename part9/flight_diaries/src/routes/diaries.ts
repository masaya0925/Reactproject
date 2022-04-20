import express from 'express';
import { getNonSensitiveEntries } from '../services/diaryService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving diaries');
});

export default router;