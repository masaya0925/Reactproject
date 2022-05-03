"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = require("../services/diaryService");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send((0, diaryService_1.getNonSensitiveEntries)());
});
router.get('/:id', (req, res) => {
    const diary = (0, diaryService_1.findById)(Number(req.params.id));
    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newDiaryEntry = (0, diaryService_1.addDiary)((0, utils_1.toNewDiaryEntry)(req.body));
        res.send(newDiaryEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
    }
});
exports.default = router;
