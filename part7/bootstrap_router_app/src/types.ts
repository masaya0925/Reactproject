export type NoteType = {
  id: number;
  user: string;
  content: string;
  important: boolean;
};

export type PropsNote = {
  note: NoteType | null | undefined;
};

export type PropNotes = {
  notes: NoteType[];
};

export type PropLogin = {
  onLogin: (user: string) => void;
};
