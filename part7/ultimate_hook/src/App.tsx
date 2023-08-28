/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useResource, useField } from "./hooks";
import { NoteType, PersonType } from "./types";

const App = () => {
  const [content, resetContent] = useField('text');
  const [name, resetName] = useField('text');
  const [number, resetNumber] = useField('text');

  const [notes, noteService] = useResource<NoteType>('http://localhost:3005/notes');
  const [persons, personsService] = useResource<PersonType>('http://localhost:3005/persons');

  useEffect(() => {
    noteService.getAll();
    personsService.getAll();
  }, []);

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    resetContent();
  };

  const handlePersonSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    personsService.create({ name: name.value, number: number.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>Note</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content}/>
        <button type="submit">create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
       name <input {...name} /><br />
       number <input {...number} />
       <button type="submit">create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  );
};

export default App;
