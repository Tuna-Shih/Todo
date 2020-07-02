import { useCallback } from 'react';
import loadMore from './loadMore';

export default (input, inputFunction) => {
  return useCallback(() => {
    if (window.innerHeight + window.scrollY < document.body.scrollHeight)
      return;
    loadMore(
      { endCursor: input.endCursor, todos: input.todos },
      {
        setEndCursor: inputFunction.setEndCursor,
        setTodos: inputFunction.setTodos
      }
    );
  }, [input, inputFunction]);
};
