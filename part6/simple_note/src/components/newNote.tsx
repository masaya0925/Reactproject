import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { createNew } from "../services/notes";

export const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    void(async() => {
      event.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const content: string = event.currentTarget.note.value;
      event.currentTarget.note.value = '';
      const newNote = await createNew(content);
      dispatch(createNote(newNote));
    })();
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