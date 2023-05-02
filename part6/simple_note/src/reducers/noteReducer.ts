import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../types";

//const generateId = () => Math.floor(Math.random() * 1000000);
const initialState: Note[] = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action: {type: string, payload: Note}) {
      state.push(action.payload);
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
    },
    appendNote(state, action: {type: string, payload: Note}) {
      state.push(action.payload);
    },
    setNotes(_state, action: {type: string, payload: Note[]}) {
      return action.payload;
    }
  }
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;