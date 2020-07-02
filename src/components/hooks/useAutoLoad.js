import { useCallback } from 'react';
import loadMore from './loadMore';

export default (input, inputFunction) => {
  return useCallback(() => {
    const toStop =
      window.innerHeight > input.wrapperRef.current.clientHeight
        ? window.innerHeight - input.wrapperRef.current.clientHeight
        : 0;
    inputFunction.setStop(toStop);

    if (window.innerHeight < input.wrapperRef.current.clientHeight) return;

    loadMore(
      { endCursor: input.endCursor, todos: input.todos },
      {
        setEndCursor: inputFunction.setEndCursor,
        setTodos: inputFunction.setTodos
      }
    );
  }, [input, inputFunction]);
};
