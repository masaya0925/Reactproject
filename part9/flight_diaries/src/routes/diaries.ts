import express from 'express';
import { getNonSensitiveEntries, findById, addDiary} from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const diary = findById(Number(req.params.id));

    if(diary) {
      res.send(diary);
    } else {
      res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newDiaryEntry = addDiary(toNewDiaryEntry(req.body));
      res.send(newDiaryEntry);
    } catch (error) {
      if(error instanceof Error){
       res.status(400).send(error.message);
     }
   }
});

export default router;