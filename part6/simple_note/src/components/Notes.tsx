import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { Note } from "../types";

type Props = {
  note: Note,
  handleClick: () => void
};

type RootState = {
  filter: string
  notes: Note[]
};

const SingleNote = ({note , handleClick}: Props) => {
  return (
    <li onClick = {handleClick}>
      {note.content}
      <strong> {note.important ? 'important': '' }</strong>
    </li>
  );
};

export const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({filter, notes}: RootState) => {
    if(filter === 'ALL') {
      return notes;
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important);
  });

  return (
    <ul>
      {notes.map(note => 
        <SingleNote 
           key = {note.id} 
           note = {note} 
           handleClick = {() => 
             dispatch(toggleImportanceOf(note.id)
           )}
        /> 
      )}    
    </ul>
  );
};