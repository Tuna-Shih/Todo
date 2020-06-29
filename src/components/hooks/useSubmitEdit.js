import { useCallback } from 'react';

export default (input, stateFunction) => {
  return useCallback(() => {
    const edit = { id: input.todoID, text: input.editText };
    stateFunction.editTodo(input.todoID, edit);
    stateFunction.setIsEdit(!input.isEdit);
  }, [input, stateFunction]);
};
