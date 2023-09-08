import React from "react";
import { PropsNote } from "../types";

export const Note = ({ note }: PropsNote) => {
  if(note === null || note === undefined) return <div />;
    return (
      <>
       <h2>{note.content}</h2>
       <div>{note.user}</div>
       <div>
        <strong>{note.important ? 'important' : ''}</strong>
       </div>
      </>
    );
};