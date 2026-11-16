import { useState } from 'react';

export const useOperationCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((previous) => previous + 1);
  };

  const decrement = () => {
    setCount((previous) => Math.max(0, previous - 1));
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, decrement, reset };
};
