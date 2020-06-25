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

const loadMore = (endCursor, todos, setEndCursor, setTodos) => {
  const gotData = loadData(10, endCursor);

  if (gotData.length === 0) return;

  const lastID = gotData.length - 1;
  const newTodos = [...todos, ...gotData];
  setEndCursor(gotData[lastID].id);
  setTodos(newTodos);
};

export function useHandleScroll(endCursor, todos, setEndCursor, setTodos) {
  return useCallback(() => {
    if (window.innerHeight + window.scrollY < document.body.scrollHeight)
      return;
    loadMore(endCursor, todos, setEndCursor, setTodos);
  }, [endCursor, todos, setEndCursor, setTodos]);
}

export function useAutoLoad(
  endCursor,
  todos,
  setEndCursor,
  setTodos,
  wrapperRef,
  setStop
) {
  return useCallback(() => {
    const toStop =
      window.innerHeight > wrapperRef.current.clientHeight
        ? window.innerHeight - wrapperRef.current.clientHeight
        : 0;
    setStop(toStop);
    if (window.innerHeight < wrapperRef.current.clientHeight) return;
    loadMore(endCursor, todos, setEndCursor, setTodos);
  }, [endCursor, todos, setEndCursor, setTodos, wrapperRef, setStop]);
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

export function useDeleteTodo(todos, setTodos) {
  return useCallback(
    id => {
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
      cookies.set('todoapp', JSON.stringify(newTodos));
    },
    [todos, setTodos]
  );
}

export function useEditTodo(todos, setTodos) {
  return useCallback(
    (id, edit) => {
      const newTodos = todos.map(todo =>
        todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
      );
      setTodos(newTodos);
      cookies.set('todoapp', JSON.stringify(newTodos));
    },
    [todos, setTodos]
  );
}
