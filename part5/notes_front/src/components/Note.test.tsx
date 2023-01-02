import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SingleNote from './Note';

test('renders content', () => {
  const note = {
    id: 'hogepiyo',
    date: new Date().toISOString(),
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const component = render(
    <SingleNote note = {note} 
    toggleImportance = {() => {return;}}
    />
  );

  // component.debug();

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('clicking the button calls event handler once', () => {
  const note = {
    id: 'homhom',
    date: new Date().toISOString(),
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const mockHandler = jest.fn();

  const component = render(
    <SingleNote note = {note} 
    toggleImportance = {mockHandler}
    />
  );

  const button = component.getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

});