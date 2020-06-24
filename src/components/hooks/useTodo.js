import { useCallback } from 'react';

export function checkOverflow(myRef, setOverflow) {
  const isOverflow = getComputedStyle(myRef.current).width;

  if (isOverflow == '250px') return setOverflow(true);

  return setOverflow(false);
}

export function useDel(todoId, deleteTodo) {
  return useCallback(() => {
    deleteTodo(todoId);
  }, [todoId, deleteTodo]);
}

export function useToggle(isEdit, setIsEdit) {
  return useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);
}

export function submit(
  todoID,
  editText,
  editTodo,
  isEdit,
  setIsEdit,
  myRef,
  setOverflow,
  checkOverflow
) {
  const edit = { id: todoID, text: editText };
  editTodo(todoID, edit);
  setIsEdit(!isEdit);
  checkOverflow(myRef, setOverflow);
}
