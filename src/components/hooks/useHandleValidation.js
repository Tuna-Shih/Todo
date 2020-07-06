import stringWidth from 'string-width';
import { useCallback, useState } from 'react';

export default addTodo => {
  const [todoText, setTodoText] = useState('');

  const handleValidation = useCallback(() => {
    if (
      todoText.length >= 200 ||
      todoText.split('').some(e => stringWidth(e) == 2)
    )
      return alert('Illegal input');

    addTodo(todoText);
    setTodoText('');
  }, [addTodo, todoText]);

  return { todoText, setTodoText, handleValidation };
};
