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

export type UserToken = {
    id: string,
    username: string,
    name: string,
    token: string
};