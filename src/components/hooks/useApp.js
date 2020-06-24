import { v4 as uuidv4 } from 'uuid';
import cookies from 'js-cookie';
import { useCallback } from 'react';

const loadData = (first, after) => {
  const getData = cookies.get('todoapp');
  if (!getData) return [];
  const todoData = JSON.parse(getData);
  const startIndex = !after
    ? -1
    : todoData.findIndex(todo => todo.id === after);

  return todoData.slice(startIndex + 1, startIndex + first + 1);
};

export function loadMore(endCursor, todos, setEndCursor, setTodos) {
  const gotData = loadData(5, endCursor);

  if (gotData.length === 0) return;

  const lastID = gotData.length - 1;
  const newTodos = [...todos, ...gotData];
  setEndCursor(gotData[lastID].id);
  setTodos(newTodos);
}

export function autoLoad(
  endCursor,
  todos,
  setEndCursor,
  setTodos,
  myRef,
  setStop
) {
  const toStop =
    window.innerHeight > myRef.current.clientHeight
      ? window.innerHeight - myRef.current.clientHeight
      : 0;

  setStop(toStop);
  if (window.innerHeight < myRef.current.clientHeight) return;
  loadMore(endCursor, todos, setEndCursor, setTodos);
}

export function useAddTodo(todoText, todos, setTodos, setTodoText) {
  return useCallback(() => {
    if (todoText.replace(/\s*/g, '') !== '') {
      const todo = { id: uuidv4(), text: todoText };
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
      setTodoText('');
      cookies.set('todoapp', JSON.stringify(newTodos));
    }
  }, [todoText, todos, setTodos, setTodoText]);
}

export function useDeleteAllTodo(setTodos) {
  return useCallback(() => {
    const newTodos = [];
    setTodos(newTodos);
    cookies.set('todoapp', JSON.stringify(newTodos));
  }, [setTodos]);
}

export function deleteTodo(id, todos, setTodos) {
  const newTodos = todos.filter(todo => todo.id !== id);
  setTodos(newTodos);
  cookies.set('todoapp', JSON.stringify(newTodos));
}

export function editTodo(id, edit, todos, setTodos) {
  const newTodos = todos.map(todo =>
    todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
  );
  setTodos(newTodos);
  cookies.set('todoapp', JSON.stringify(newTodos));
}
