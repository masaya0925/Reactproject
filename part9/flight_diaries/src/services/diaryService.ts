import { diaryEntries } from '../../data/diaries';

import { NonSensitiveEntry, DiaryEntry, NewDiaryEntry} from '../types';

const diaries: Array<DiaryEntry> = diaryEntries;

export const getEntries = (): Array<DiaryEntry> => {
    return diaries;
};

export const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};

export const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

export const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};