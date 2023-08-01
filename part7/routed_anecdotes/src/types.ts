export type AnecdoteType = {
  id: number;
  content: string;
  author: string;
  info: string;
  votes: number;
};

export type PropsAnecdote = {
  anecdote: AnecdoteType | null | undefined;
};

export type PropsNewAnecdote = Omit<AnecdoteType, 'id'>;
