import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { Note } from "../types";

type Props = {
  note: Note,
  handleClick: () => void
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
  const notes = useSelector(state => state) as Note[];

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