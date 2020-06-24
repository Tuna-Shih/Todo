import { useCallback } from 'react';

export function useCheckOverflow(myRef, setOverflow) {
  return useCallback(() => {
    const isOverflow = getComputedStyle(myRef.current).width;

    if (isOverflow == '250px') return setOverflow(true);

    return setOverflow(false);
  }, [myRef, setOverflow]);
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

export function useSubmit(todoID, editText, editTodo, isEdit, setIsEdit) {
  return useCallback(() => {
    const edit = { id: todoID, text: editText };
    editTodo(todoID, edit);
    setIsEdit(!isEdit);
  }, [todoID, editText, editTodo, isEdit, setIsEdit]);
}
