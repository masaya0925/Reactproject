export type Anecdote = {
  id: number;
  content: string;
  votes: number;
};

export type NewAnecdote = {
  content: string;
  votes: number;
};

export type NotificationType = {
  type: string;
  message: string;
  isOpen: boolean;
};
