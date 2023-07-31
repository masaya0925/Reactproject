export type PropsAnecdote = {
  id: number;
  content: string;
  author: string;
  info: string;
  votes: number;
};

export type PropsNewAnecdote = Omit<PropsAnecdote, 'id'>;
