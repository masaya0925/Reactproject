import React, { useState } from 'react';

const useCounter = () => {
  const [value, setValue] = useState<number>(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const App = () => {
  const left = useCounter();
  const right = useCounter();

  return (
    <div>
      <div>{left.value}</div>
      <button type="button" onClick={left.increase}>
        left
      </button>
      <button type="button" onClick={right.increase}>
        right
      </button>
      <div>{right.value}</div>
    </div>
  );
};

export default App;
