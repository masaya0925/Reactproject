import React from "react";
import { Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, 
         TableContainer, TableRow } from "@mui/material";
import { PropNotes } from "../types";

export const Notes = ({ notes }: PropNotes) => (
  <>
   <h2>Notes</h2>

    <TableContainer component={Paper}>
     <Table>
      <TableBody>
       {notes.map(note => 
         <TableRow key = {note.id}>
            <TableCell>
             <Link to = {`/notes/${note.id}`}>
               {note.content}
             </Link>
            </TableCell>
            <TableCell>
              {note.user}
            </TableCell>
         </TableRow>
       )}
      </TableBody>
    </Table>
  </TableContainer>
  </>
);