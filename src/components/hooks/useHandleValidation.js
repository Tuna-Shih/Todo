import stringWidth from 'string-width';
import { useCallback } from 'react';

export default (todoText, addTodo) => {
  return useCallback(() => {
    if (
      todoText.length >= 200 ||
      todoText.split('').some(e => stringWidth(e) == 2)
    )
      return alert('Illegal input');

    addTodo();
  }, [todoText, addTodo]);
};
