import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { PropNotes } from "../types";

export const Notes = ({ notes }: PropNotes) => (
  <>
   <h2>Notes</h2>
    <Table striped>
     <tbody>
       {notes.map(note => 
         <tr key = {note.id}>
            <td>
             <Link to = {`/notes/${note.id}`}>
               {note.content}
             </Link>
            </td>
            <td>
              {note.user}
            </td>
         </tr>
       )}
    </tbody>
  </Table>
  </>
);