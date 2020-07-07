import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { useCallback } from 'react';

export default (todos, setTodos) =>
  useCallback(
    todoText => {
      if (todoText.replace(/\s*/g, '') !== '') {
        const todo = { id: uuidv4(), text: todoText };
        const newTodos = [todo, ...todos];
        setTodos(newTodos);

        cookies.set('todoapp', JSON.stringify(newTodos));
      }
    },
    [todos, setTodos]
  );
