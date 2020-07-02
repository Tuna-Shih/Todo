import stringWidth from 'string-width';
import { useCallback } from 'react';

export default (input, inputFunction) => {
  return useCallback(() => {
    if (input.length >= 200 || input.split('').some(e => stringWidth(e) == 2))
      return alert('Illegal input');

    inputFunction.addTodo(input);
    inputFunction.setTodoText('');
  }, [input, inputFunction]);
};
