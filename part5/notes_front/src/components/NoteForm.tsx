import React from "react";

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
};

export const NoteForm: React.FC<Props> = ({onSubmit, handleChange, value}) => {
  return (
    <>
     <h2>Create a new note</h2>

      <form onSubmit = {onSubmit}>
        <input value = {value}
            onChange = {handleChange}
      />
        <button type = "submit">save</button>
      </form>
    </>
  );
};