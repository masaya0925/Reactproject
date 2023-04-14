import { createSlice } from "@reduxjs/toolkit";

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

const generateId = () => Math.floor(Math.random() * 1000000);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action: {type: string, payload: string}) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId()
      });
    },
    toggleImportanceOf(state, action: {type: string, payload: number}) {
      const id = action.payload;
      const noteToChange = state.find(n => n.id === id);
      if(noteToChange === undefined){
        throw new Error();
      }
      const changeNote = {
        ...noteToChange,
        important: !noteToChange.important
      };
      console.log(JSON.parse(JSON.stringify(state)));
      return state.map(note => note.id !== id ? note : changeNote);
    }
  }
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;