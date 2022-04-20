import { diaries } from '../../data/diaries';

import { NonSensitiveEntry, DiaryEntry } from '../types';

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

export const addDiary = () => {
    return null;
};
