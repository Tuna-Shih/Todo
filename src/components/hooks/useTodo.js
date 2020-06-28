import { useCallback } from 'react';

export function useTodo(doFunc, input, stateFunction) {
  const del = useCallback(() => {
    stateFunction(input);
  }, [input, stateFunction]);

  const toggle = useCallback(() => {
    stateFunction(!input);
  }, [input, stateFunction]);

  const checkOverflow = useCallback(() => {
    const isOverflow = getComputedStyle(input.current).width;

    if (isOverflow == '250px') return stateFunction(true);

    return stateFunction(false);
  }, [input, stateFunction]);

  const submit = useCallback(() => {
    const edit = { id: input.todoID, text: input.editText };
    stateFunction.editTodo(input.todoID, edit);
    stateFunction.setIsEdit(!input.isEdit);
  }, [input, stateFunction]);

  if (doFunc == 'delete') {
    return del;
  } else if (doFunc == 'toggle') {
    return toggle;
  } else if (doFunc == 'checkOverflow') {
    return checkOverflow;
  } else if (doFunc == 'submit') {
    return submit;
  }
}
