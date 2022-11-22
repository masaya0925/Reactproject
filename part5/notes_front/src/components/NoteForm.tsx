import React, { useState } from "react";
import { newNote } from "../utils/types";

type Props = {
  createNote: (newNote: newNote) => void
};

export const NoteForm: React.FC<Props> = ({ createNote }) => {
  const [newNote, setNewNote] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNote({
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
    });

    setNewNote('');
  };

  return (
    <>
     <h2>Create a new note</h2>

      <form onSubmit = {addNote}>
        <input value = {newNote}
            onChange = {handleChange}
      />
        <button type = "submit">save</button>
      </form>
    </>
  );
};