"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.addDiary = exports.getNonSensitiveEntries = exports.getEntries = void 0;
const diaries_1 = require("../../data/diaries");
const diaries = diaries_1.diaryEntries;
const getEntries = () => {
    return diaries;
};
exports.getEntries = getEntries;
const getNonSensitiveEntries = () => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};
exports.getNonSensitiveEntries = getNonSensitiveEntries;
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...diaries.map(d => d.id)) + 1 }, entry);
    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};
exports.addDiary = addDiary;
const findById = (id) => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};
exports.findById = findById;
