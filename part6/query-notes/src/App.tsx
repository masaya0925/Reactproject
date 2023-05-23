import React from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { getNotes } from './request';

import { Note } from './types';

const App = () => {
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    console.log(content);
  };

  const toggleImportance = (note: Note) => {
    console.log('toggle importance of', note.id);
  };

  const result: UseQueryResult<Note[]> = useQuery('notes', getNotes);

  console.log(result);

  if(result.isLoading) {
    return <>Loading data...</>;
  }

  if(result.isError) {
    return <>error</>;
  }

  if(result.data === undefined) {
    return <>undefined data</>;
  }

  const notes: Note[] = result.data;

  return(
    <>
     <h2>Notes app</h2>
     <form onSubmit = {addNote}>
       <input name = 'note'/>
       <button type = 'submit'>add</button>
     </form>
     {notes.map(note => 
        <li key = {note.id} onClick = {() => toggleImportance(note)}>
          {note.content}
        <strong>{note.important ? 'important' : ''}</strong>
        </li>
      )}
    </>
  );
};

export default App;
