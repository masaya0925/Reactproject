import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NoteForm } from "./NoteForm";

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn();

  const component = render(<NoteForm createNote = {createNote}/>);

  const input = component.container.querySelector('input');
  expect(input).not.toBeNull();
  if(input === null) return;

  const form = component.container.querySelector('form');
  expect(form).not.toBeNull();
  if(form === null) return;

  fireEvent.change(input, {
    target: {value: 'testing form could be easier'}
  });
  fireEvent.submit(form);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe('testing form could be easier');
});
