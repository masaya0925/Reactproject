const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
  
  const getId = () => Math.floor(Math.random() * 1000000);
  
  const asObject = (anecdote: string) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    };
  };
  
  const initialState = anecdotesAtStart.map(asObject);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const anecdoteReducer = (state = initialState, action: { type: string, data: any}) => {
    console.log('state now: ', state);
    console.log('action', action);
    switch(action.type) {
      case 'NEW_ANECDOTE':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return[...state.sort((a, b) => b.votes - a.votes), action.data];
      case 'VOTE':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const id = action.data.id;
        const voteToAnecdote = state.find(a => a.id === id);
        if(voteToAnecdote === undefined) {
            throw new Error();
        }
        const voteAnecdote = {
            ...voteToAnecdote,
            votes: voteToAnecdote.votes + 1
        };
        return state.map(anecdote => 
          anecdote.id !== id ? anecdote : voteAnecdote)
          .sort((a, b) => b.votes - a.votes
        );
      default: 
        return state;
    }
  };

  export const createAnecdote = (content: string) => {
    return { 
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: getId(),
        votes: 0
      }
    };
  };

  export const vote = (id: number) => {
    return {
        type: 'VOTE',
        data: { id }
    };
  };