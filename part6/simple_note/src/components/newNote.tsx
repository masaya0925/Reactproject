import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Note } from "../types";

export const NewNote = () => {
  const dispatch: ThunkDispatch<Note[], unknown, AnyAction> = useDispatch();

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const content: string = event.currentTarget.note.value;
      event.currentTarget.note.value = '';
      void dispatch(createNote(content));
  };

  return (
    <>
     <form onSubmit = {addNote}>
      <input name = 'note' />
      <button type = 'submit'>add</button>
     </form>
    </>
  );
};