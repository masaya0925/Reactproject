import React, { useState } from "react";

export const useField = (type: string): 
  [typeof attributes, typeof reset] => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  }

  const attributes = {
    type,
    value,
    onChange
  };

  return [attributes, reset];
};