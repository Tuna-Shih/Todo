import { useCallback } from 'react';

export default (input, inputFunction) => {
  return useCallback(() => {
    const isOverflow = getComputedStyle(input.current).width;

    if (isOverflow == '250px') return inputFunction(true);

    return inputFunction(false);
  }, [input, inputFunction]);
};
