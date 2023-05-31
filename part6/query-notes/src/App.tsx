import React from 'react';
import { UseQueryResult, useQuery, useMutation, useQueryClient } from 'react-query';
import { getNotes, createNote, updateNote } from './request';

import { Note } from './types';

const App = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData<Note[]>('notes');
      if(notes) {
        void queryClient.setQueryData('notes', [...notes, newNote]);
      }
    }
  });

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.note.value;
    event.currentTarget.note.value = '';
    newNoteMutation.mutate({ content, important: true });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (updatedNote) => {
      const notes = queryClient.getQueryData<Note[]>('notes');
      if(notes) {
        void queryClient.setQueryData<Note[]>('notes',
          notes.map(note => 
            note.id !== updatedNote.id ? note : updatedNote)
        );
      }
    }
  });

  const toggleImportance = (note: Note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
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
