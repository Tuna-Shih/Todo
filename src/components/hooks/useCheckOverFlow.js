import { useCallback } from 'react';

export default (input, stateFunction) => {
  return useCallback(() => {
    const isOverflow = getComputedStyle(input.current).width;

    if (isOverflow == '250px') return stateFunction(true);

    return stateFunction(false);
  }, [input, stateFunction]);
};
