import { useEffect } from 'react';

import loadMore from '../utils/loadMore';

export default ({ endCursor, todos }, { setEndCursor, setTodos }) =>
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY < document.body.scrollHeight)
        return;
      const { endCursor: newEndCursor, todos: newTodos } = loadMore({
        endCursor,
        todos
      });

      setEndCursor(newEndCursor);
      setTodos(newTodos);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });
