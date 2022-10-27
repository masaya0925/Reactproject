export type Note = {
    id: string,
    content: string,
    date: string,
    important: boolean
};

export type newNote = Omit<Note, 'id'>;

export type User = {
    id: string,
    username: string
};