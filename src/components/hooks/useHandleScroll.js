import { useEffect } from 'react';

import loadMore from '../utils/loadMore';

export default (input, inputFunction) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY < document.body.scrollHeight)
        return;
      const { endCursor, todos } = loadMore({
        endCursor: input.endCursor,
        todos: input.todos
      });

      inputFunction.setEndCursor(endCursor);
      inputFunction.setTodos(todos);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });
};
