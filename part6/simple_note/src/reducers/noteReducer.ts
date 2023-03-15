import { Note } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noteReducer = ( state: Note[] = [], action: { type: string, data: any }) => {
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
