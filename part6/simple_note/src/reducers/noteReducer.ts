import { Note } from "../types";

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noteReducer = ( state: Note[] = initialState, action: { type: string, data: any }) => {
   console.log('ACTION:', action); 
   switch (action.type) {
     case 'NEW_NOTE': 
       // eslint-disable-next-line @typescript-eslint/no-unsafe-return
       return [...state, action.data];
     case 'TOGGLE_IMPORTANCE': {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const id = action.data.id;
        const noteToChange = state.find(n => n.id === id);
        if(noteToChange === undefined) {
          throw new Error();
        }
        const changeNote = {
            ...noteToChange,
            important: !noteToChange?.important
        };
        return state.map(note => 
            note.id !== id ? note : changeNote
        );
     }
     default:
        return state;
   }
};

const generateId = () => Math.floor(Math.random() * 1000000);

export const createNote = (content: string) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  };
};

export const toggleImportanceOf = (id: number) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data:  { id }
  };
};