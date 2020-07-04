import { useEffect } from 'react';
import loadMore from '../utils/loadMore';

export default (input, inputFunction) => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY < document.body.scrollHeight)
      return;
    loadMore(
      { endCursor: input.endCursor, todos: input.todos },
      {
        setEndCursor: inputFunction.setEndCursor,
        setTodos: inputFunction.setTodos
      }
    );
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });
};
